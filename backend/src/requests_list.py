from util.database.request_list_model import BookingRequestModel
from util.database import db
from flask import jsonify

class RequestsList:
    def get_all_requests():
        requests_list = BookingRequestModel.query.all()
        requests_dicts = [request.to_dict() for request in requests_list]
        return jsonify(requests_dicts)
    
    def get_pending_requests():
        pending_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Pending')
        pending_requests_dicts = [pending_request.to_dict() for pending_request in pending_requests_list]
        return jsonify(pending_requests_dicts)
    
    def get_accepted_requests():
        accepted_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Accepted')
        accepted_requests_dicts = [accepted_request.to_dict() for accepted_request in accepted_requests_list]
        return jsonify(accepted_requests_dicts)
    
    def get_rejected_requests():
        rejected_requests_list = BookingRequestModel.query.filter(BookingRequestModel.status == 'Rejected')
        rejected_requests_dicts = [rejected_request.to_dict() for rejected_request in rejected_requests_list]
        return jsonify(rejected_requests_dicts)
        
    def get_user_requests(user):
        user_requests_list = BookingRequestModel.query.filter(BookingRequestModel.email == user['email'])
        user_requests_dicts = [user_request.to_dict() for user_request in user_requests_list]
        return jsonify(user_requests_dicts)
    


    def add_new_request(request):
         # id subject to modification
        booking_request = BookingRequestModel(name=request['name'], email=request['email'], date=request['date'], 
                                                start_time=request['start_time'], end_time=request['end_time'], room=request['room'], 
                                                    title=request['title'], details=request['details'], status='Pending')

        #checks and modifications

        # add to database
        db.session.add(booking_request)
        db.session.commit()

        return True, 'Request added successfully'

    def accept_request(request):
        accept = BookingRequestModel.query.filter(BookingRequestModel.request_id == request['requestID']).first()
        accept.status = 'Accepted'
        db.session.commit()
        return True, 'Request accepted successfully'

    def reject_request(request):
        accept = BookingRequestModel.query.filter(BookingRequestModel.request_id == request['requestID']).first()
        accept.status = 'Rejected'
        db.session.commit()
        return True, 'Request rejected successfully'

    def cancel_request(request):
        request.status = 'Cancelled'
        db.session.commit()
        return True, 'Request cancelled successfully'