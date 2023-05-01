from util.database.request_list_model import BookingRequestModel
from util.database import db
from flask import jsonify
from datetime import datetime

class RequestsList:
    ''' This class contains all the methods that are used to view, add, accept, reject, and cancel booking
        requests, as well as the logic to detect conflicts between requests. The appropriate mails are sent
        to the users when their request status is changed. '''
    
    # Method to check for conflicts between requests #
    def get_conflicting_requests(request_data: dict, status: str):
        ''' This method returns all the requests that conflict with the given request as a list of dictionaries.'''

        # Convert the request start time and end time strings to time objects
        start_time = datetime.strptime(request_data['start_time'], '%H-%M').time()
        end_time = datetime.strptime(request_data['end_time'], '%H-%M').time()

        # Query for all the requests that conflict with the given request (The end points are allowed to overlap)
        conflicting_requests_list = BookingRequestModel.query.filter(
                BookingRequestModel.status == status,
                BookingRequestModel.request_id != request_data.get('request_id', None),
                BookingRequestModel.room == request_data['room'],
                BookingRequestModel.date == request_data['date'],
                BookingRequestModel.start_time < end_time,
                BookingRequestModel.end_time > start_time
            )

        conflicting_requests_dicts = [conflicting_request.to_dict() for conflicting_request in conflicting_requests_list]
        return conflicting_requests_dicts
    

    # Methods to add, accept, reject, and cancel requests #
    def add_new_request(request):
        ''' This method adds a new booking request to the database after ensuring that there are no conflicts '''
        
        # Check for conflicts with accepted requests
        conflicting_accepted_requests = RequestsList.get_conflicting_requests(request, 'Accepted')
        if conflicting_accepted_requests:
            return False, 'There are conflicts with accepted requests.', conflicting_accepted_requests

        # Create the new booking request object
        booking_request = BookingRequestModel(name=request['name'], email=request['email'], date=request['date'], 
                                                start_time=request['start_time'], end_time=request['end_time'], room=request['room'], 
                                                    title=request['title'], details=request['details'], status='Pending')
        
        # Add the new booking request to the database
        db.session.add(booking_request)
        db.session.commit()
        # TODO: Send mail to the user

        return True, 'Booking request successfully made.', None

    def accept_request(request_id: int):
        ''' This method accepts a booking request and changes its status to 'Accepted' in the database '''

        request = BookingRequestModel.query.filter(BookingRequestModel.request_id == request_id).first()

        if request.status != 'Pending':
            return False, 'Request is already' + request.status.lower() + '.', None
        
        # Check for conflicts with accepted requests
        conflicting_accepted_requests = RequestsList.get_conflicting_requests(request.to_dict(), 'Accepted')
        if conflicting_accepted_requests:
            return False, 'There are conflicts with accepted requests.', conflicting_accepted_requests
        
        # Accept the request
        request.status = 'Accepted'
        db.session.commit()
        # TODO: Send mail to the user

        # Reject all the conflicting pending requests
        conflicting_pending_requests = RequestsList.get_conflicting_requests(request.to_dict(), 'Pending')
        for conflicting_request in conflicting_pending_requests:
            conflicting_request = BookingRequestModel.query.filter(BookingRequestModel.request_id == conflicting_request['request_id']).first()
            conflicting_request.status = 'Rejected'
            # TODO: Send mail to the user
        db.session.commit()

        return True, 'Request accepted successfully', conflicting_pending_requests

    def reject_request(request_id: int):
        ''' This method rejects a booking request and changes its status to 'Rejected' in the database '''
        request = BookingRequestModel.query.filter(BookingRequestModel.request_id == request_id).first()

        if request.status != 'Pending':
            return False, 'Request is already' + request.status.lower() + '.'
        
        request.status = 'Rejected'
        db.session.commit()
        # TODO: Send mail to the user

        return True, 'Request rejected successfully'
        
    def cancel_request(request_id: int):
        ''' This method cancels a booking request and changes its status to 'Cancelled' in the database '''
        request = BookingRequestModel.query.filter(BookingRequestModel.request_id == request_id).first()

        if request.status != 'Accepted':
            return False, 'Cannot cancel a request that is not accepted.'
        
        request.status = 'Cancelled'
        db.session.commit()
        # TODO: Send mail to the user

        return True, 'Request cancelled successfully'
    

    # Methods to get the requests with different statuses from the database #
    def get_all_requests():
        ''' This method returns all the booking requests in the database as a json object '''
        requests_list = BookingRequestModel.query.all()
        requests_dicts = [request.to_dict() for request in requests_list]
        return jsonify(requests_dicts)

    def get_pending_requests():
        ''' This method returns all the pending booking requests in the database as a json object '''
        pending_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Pending')
        pending_requests_dicts = [pending_request.to_dict() for pending_request in pending_requests_list]
        return jsonify(pending_requests_dicts)
    
    def get_accepted_requests():
        ''' This method returns all the accepted booking requests in the database as a json object '''
        accepted_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Accepted')
        accepted_requests_dicts = [accepted_request.to_dict() for accepted_request in accepted_requests_list]
        return jsonify(accepted_requests_dicts)
    
    def get_rejected_requests():
        ''' This method returns all the rejected booking requests in the database as a json object '''
        rejected_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Rejected')
        rejected_requests_dicts = [rejected_request.to_dict() for rejected_request in rejected_requests_list]
        return jsonify(rejected_requests_dicts)
        
    def get_user_requests(user):
        ''' This method returns all the booking requests made by a particular user as a json object '''
        user_requests_list = BookingRequestModel.query.filter(BookingRequestModel.email == user['email'])
        user_requests_dicts = [user_request.to_dict() for user_request in user_requests_list]
        return jsonify(user_requests_dicts)