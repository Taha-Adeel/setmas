import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from util.database.admin_list_model import AdminModel
from util.database.request_list_model import BookingRequestsModel
from util.database import db, create_db_tables
from admin.admin_list import AdminList

app = Flask(__name__, template_folder='../templates')
cors = CORS(app)

# Configuration
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['CORS_ORIGINS'] = ['http://localhost:3000']
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.join(os.path.abspath(os.path.dirname(__file__)), '../data'), 'database.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

# Create tables
@app.before_first_request
def create_tables():
    create_db_tables(app)

############## Booking Request Functions ##############

# Creating a request
@app.route('/create_request', methods=['PUT'])
def create_request():
    data = request.get_json()
    # id subject to modification
    booking_request = BookingRequestsModel(name=data['name'], email=data['email'], date=data['date'], start_time=data['start_time'], end_time=data['end_time'], room=data['room'], title=data['title'], details=data['details'], status='Pending')

    #checks and modifications

    # add to database
    db.session.add(booking_request)
    db.session.commit()

    success = {'status': 'success'}
    return make_response(success, 200)
    # return booking_request

#show all  requests
@app.route('/request_list', methods=['GET'])
def view_requests_list():
    requests_list = BookingRequestsModel.query.all()
    requests_dict = [request.to_dict() for request in requests_list]
    return jsonify(requests_dict)

# accept a request
@app.route('/accept_request', methods=['PATCH'])
def accept_request():
    data = request.get_json()
    accept = BookingRequestsModel.query.filter(BookingRequestsModel.requestID == data['requestID']).first()
    accept.status = 'Accepted'
    db.session.commit()

    success = {'status': 'success'}
    return make_response(success, 200)

# reject a request
@app.route('/reject_request', methods=['PATCH'])
def reject_request():
    data = request.get_json()
    reject = BookingRequestsModel.query.filter(BookingRequestsModel.requestID == data['requestID']).first()
    reject.status = 'Rejected'
    db.session.commit()

    success = {'status': 'success'}
    return make_response(success, 200)

#get requests by user
@app.route('/user_requests', methods=['GET'])
def view_user_requests():
    data = request.get_json()
    user_requests_list = BookingRequestsModel.query.filter(BookingRequestsModel.name == data['name'])
    user_requests_dict = [user_request.to_dict() for user_request in user_requests_list]
    return jsonify(user_requests_dict)

    
############## Admin Management Functions ##############


# viewing admin list
@app.route('/admin_list', methods=['GET'])
def view_admins_list():
    return AdminList.get_admin_list()

@app.route('/add_admin', methods=['PUT'])
def add_admin():
    admin_data = request.get_json()
    success, msg = AdminList.add_admin(admin_data)
    
    if success:
        return make_response({'Resonse': msg}, 200)
    return make_response({'Resonse': msg}, 400)


@app.route('/delete_admin', methods=['DELETE'])
def delete_admin():
    admin_data = request.get_json()
    success, msg = AdminList.delete_admin(admin_data)

    if success:
        return make_response({'Response': msg}, 200)
    return make_response({'Response': msg}, 400)
    

@app.route('/make_super_admin', methods=['PATCH'])
def make_super_admin():
    admin_data = request.get_json()
    success, msg = AdminList.make_super_admin(admin_data)

    if success:
        return make_response({'Response': msg}, 200)
    return make_response({'Response': msg}, 400)
    

@app.route('/check_user_state', methods=['GET'])
def check_user_state():
    admin_data = request.get_json()
    state = AdminList.check_user_level(admin_data)
    reply = {'state': state}
    return reply.jsonify()

    
        
if __name__ == '__main__':
    app.run(debug=True)   