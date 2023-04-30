import os
from flask import Flask, request, make_response
from flask_cors import CORS
from util.database import db, create_db_tables
from admin_list import AdminList
from requests_list import RequestsList

app = Flask(__name__)
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

#show all requests
@app.route('/request_list', methods=['GET'])
def view_requests_list():
    return RequestsList.get_all_requests()

#show all accepted requests
@app.route('/accepted_requests', methods=['GET'])
def view_accepted_requests():
    return RequestsList.get_accepted_requests()

#show all pending requests
@app.route('/pending_requests', methods=['GET'])
def view_pending_requests():
    return RequestsList.get_pending_requests()

#show all rejected requests
@app.route('/rejected_requests', methods=['GET'])
def view_rejected_requests():
    return RequestsList.get_rejected_requests()

#show all cancelled requests
@app.route('/cancelled_requests', methods=['GET'])
def view_cancelled_requests():
    return RequestsList.get_cancelled_requests()

#get requests by user
@app.route('/user_requests', methods=['GET'])
def view_user_requests():
    user = request.get_json()
    return RequestsList.get_user_requests(user)

# Creating a request
@app.route('/booking_request', methods=['PUT'])
def booking_request():
    request_data = request.get_json()
    success, msg = RequestsList.add_new_request(request_data)

    if success:
        return make_response({'Response': msg}, 200)
    return make_response({'Response': msg}, 400)

# accept a request
@app.route('/accept_request', methods=['PATCH'])
def accept_request():
    request_data = request.get_json()
    success, msg = RequestsList.accept_request(request_data)

    if success:
        return make_response({'Response': msg}, 200)
    return make_response({'Response': msg}, 400)

# reject a request
@app.route('/reject_request', methods=['PATCH'])
def reject_request():
    request_data = request.get_json()
    success, msg = RequestsList.reject_request(request_data)

    if success:
        return make_response({'Response': msg}, 200)
    return make_response({'Response': msg}, 400)


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