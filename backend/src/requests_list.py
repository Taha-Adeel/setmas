from util.database.request_list_model import BookingRequestModel
from util.database import db
from flask import jsonify
from datetime import datetime

class RequestsList:
    """
    This class contains methods for managing booking requests, including adding, accepting, rejecting, and canceling requests by 
    interacting with the database. It also provides functionality to detect conflicts between requests and send appropriate emails 
    to users when their request status is changed.
    """
    
    ### Method for finding conflicting requests ###
    def get_conflicting_requests(request_data: dict, status: str):
        """
        Get conflicting requests that overlap with the given request.

        Args:
            request_data (dict): Dictionary containing the details of the request.
            status (str): Status of the requests to consider for conflicts.

        Returns:
            List: A list of dictionaries representing the conflicting requests.
        """

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

        # Convert the conflicting requests to a list of dictionaries and return it
        conflicting_requests_dicts = [conflicting_request.to_dict() for conflicting_request in conflicting_requests_list]
        return conflicting_requests_dicts
    

    ### Methods for adding, accepting, rejecting, and canceling requests ###
    def add_new_request(request: dict):
        """
        Add a new booking request to the database after checking for conflicts.

        Args:
            request (dict): Dictionary containing the details of the new request.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation,
                   a string message response, and a list of conflicting requests if any.
        """
        
        # Check for conflicts with accepted requests
        conflicting_accepted_requests = RequestsList.get_conflicting_requests(request, 'Accepted')
        if conflicting_accepted_requests:
            return False, 'There are conflicts with accepted requests.', conflicting_accepted_requests

        # Create the new booking request object
        booking_request = BookingRequestModel(
            name=request['name'], 
            email=request['email'],
            room=request['room'],
            date=request['date'],
            start_time=request['start_time'],
            end_time=request['end_time'],
            title=request['title'],
            details=request['details'],
            status='Pending'
        )
        
        # Add the new booking request to the database
        db.session.add(booking_request)
        db.session.commit()
        # TODO: Send mail to the user

        return True, 'Booking request successfully made.', None

    def accept_request(request_id: int):
        """
        Accept a booking request and update its status to 'Accepted' in the database.

        Args:
            request_id (int): ID of the request to be accepted.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation,
                   a string message response, and a list of conflicting requests if any.
        """

        # Get the request object from the database
        request = BookingRequestModel.query.filter(BookingRequestModel.request_id == request_id).first()

        # Check if the request is not pending
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
        """
        Reject a booking request and update its status to 'Rejected' in the database.

        Args:
            request_id (int): ID of the request to be rejected.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation and a string message response.
        """

        # Get the request object from the database
        request = BookingRequestModel.query.filter(BookingRequestModel.request_id == request_id).first()

        # Check if the request is not pending
        if request.status != 'Pending':
            return False, 'Request is already' + request.status.lower() + '.'
        
        # Reject the request
        request.status = 'Rejected'
        db.session.commit()
        # TODO: Send mail to the user

        return True, 'Request rejected successfully'
        
    def cancel_request(request_id: int):
        """
        Cancel a booking request and update its status to 'Cancelled' in the database.

        Args:
            request_id (int): ID of the request to be cancelled.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation and a string message.
        """

        # Get the request object from the database
        request = BookingRequestModel.query.filter(BookingRequestModel.request_id == request_id).first()

        # Check if the request is not accepted
        if request.status != 'Accepted':
            return False, 'Cannot cancel a request that is not accepted.'
        
        # Cancel the request
        request.status = 'Cancelled'
        db.session.commit()
        # TODO: Send mail to the user

        return True, 'Request cancelled successfully'
    

    ### Methods for getting requests depending on their status ###
    def get_all_requests():
        """
        Retrieve all booking requests from the database.

        Returns:
            Response: A JSON response containing all the booking requests as a JSON object.
        """
        requests_list = BookingRequestModel.query.all()
        requests_dicts = [request.to_dict() for request in requests_list]
        return jsonify(requests_dicts)

    def get_pending_requests():
        """
        Retreive all pending booking requests from the database.

        Returns:
            Response: A JSON response containing all the pending booking requests as a JSON object.
        """
        pending_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Pending')
        pending_requests_dicts = [pending_request.to_dict() for pending_request in pending_requests_list]
        return jsonify(pending_requests_dicts)
    
    def get_accepted_requests():
        """
        Retreive all accepted booking requests from the database.

        Returns:
            Response: A JSON response containing all the accepted booking requests as a JSON object.
        """
        accepted_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Accepted')
        accepted_requests_dicts = [accepted_request.to_dict() for accepted_request in accepted_requests_list]
        return jsonify(accepted_requests_dicts)
    
    def get_rejected_requests():
        """
        Retreive all rejected booking requests from the database.
        
        Returns:
            Response: A JSON response containing all the rejected booking requests as a JSON object.
        """
        rejected_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Rejected')
        rejected_requests_dicts = [rejected_request.to_dict() for rejected_request in rejected_requests_list]
        return jsonify(rejected_requests_dicts)
        
    def get_user_requests(user: dict):
        """
        Retrieve all booking requests made by a particular user from the database.

        Args:
            user (dict): Dictionary containing the details of the user.

        Returns:
            Response: A JSON response containing all the booking requests made by the user as a JSON object.
        """
        user_requests_list = BookingRequestModel.query.filter(BookingRequestModel.email == user['email'])
        user_requests_dicts = [user_request.to_dict() for user_request in user_requests_list]
        return jsonify(user_requests_dicts)