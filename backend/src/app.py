"""
This module defines the Flask application for managing seminar room booking requests and admin management.

The application provides various endpoints for managing booking requests, including creating a new request,
viewing all requests, accepting or rejecting requests, and canceling requests. It also provides endpoints
for admin management, such as viewing the admin list, adding a new admin, deleting an admin, and making an
admin a super admin.

Endpoints:
- /request_list: View all booking requests.
- /accepted_requests: View all accepted booking requests.
- /pending_requests: View all pending booking requests.
- /rejected_requests: View all rejected booking requests.
- /user_requests: View booking requests made by a specific user.
- /conflicting_requests: View conflicting booking requests for a specific request.
- /booking_request: Create a new booking request.
- /accept_request: Accept a booking request.
- /reject_request: Reject a booking request.
- /cancel_request: Cancel a booking request.
- /admin_list: View the admin list.
- /add_admin: Add a new admin.
- /delete_admin: Delete an admin.
- /make_super_admin: Make an admin a super admin.
- /check_user_state: Check the state (user, admin, or super admin) of an admin.

Authors: Taha Adeel Mohammed, Shambu Kavir, Jatin T, Prashanth
Date: 1st May 2023
"""

import os
from flask import Flask, request, make_response
from flask_cors import CORS
from util.database import db, create_db_tables
from admin_list import AdminList
from requests_list import RequestsList
from util.mailer import Mailer, init_mailer

# Initialize the app
app = Flask(__name__)
cors = CORS(app)

# Configure the app (database, secret key, CORS origins, etc.)
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['CORS_ORIGINS'] = ['http://localhost:3000']
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.join(os.path.abspath(os.path.dirname(__file__)), '../data'), 'database.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['CORS_HEADERS'] = 'Content-Type'

# Set the mail server configuration variables
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'setmasiith@gmail.com'
app.config['MAIL_PASSWORD'] = 'nkryqhcbrabdgwkn'

# Initialize the database
db.init_app(app)

# Create the admin and requests tables before the first request is handled
@app.before_first_request
def create_tables():
    create_db_tables(app)
    init_mailer(app)

############## View requests ##############

# View all booking requests
@app.route('/request_list', methods=['GET'])
def view_requests_list():
    return RequestsList.get_all_requests()

# View all accepted booking requests. Anyone can access this endpoint.
@app.route('/accepted_requests', methods=['GET'])
def view_accepted_requests():
    return RequestsList.get_accepted_requests()

# View all pending booking requests. Admins and super admins can access this endpoint.
@app.route('/pending_requests', methods=['GET'])
def view_pending_requests():
    return RequestsList.get_pending_requests()

# View all rejected booking requests. Admins and super admins can access this endpoint.
@app.route('/rejected_requests', methods=['GET'])
def view_rejected_requests():
    return RequestsList.get_rejected_requests()

# View booking requests made by a specific user. Only that user can access this endpoint (and admins and superadmins).
@app.route('/user_requests', methods=['GET', 'POST'])
def view_user_requests():
    user = request.get_json()
    return RequestsList.get_user_requests(user)

# View conflicting booking requests for a specific request.
@app.route('/conflicting_requests', methods=['GET'])
def view_conflicting_requests():
    request_id = request.get_json()['request_id']
    return RequestsList.get_conflicting_requests(request_id, 'Accepted')


############## Manage requests ##############

# Create a new booking request. Logged in users can access this endpoint.
@app.route('/booking_request', methods=['PUT'])
def booking_request():
    success, msg, conflicting_accepted_requests = RequestsList.add_new_request(request = request.get_json())
    return make_response({'Response': msg, 'Conflicting seminars': conflicting_accepted_requests}, 200 if success else 400)

# Accept a booking request. Only admins and super admins can access this endpoint.
@app.route('/accept_request', methods=['PATCH'])
def accept_request():
    success, msg, conflicting_requests = RequestsList.accept_request(request_id = request.get_json()['request_id'])
    return make_response({'Response': msg, 'Conflicting seminars': conflicting_requests}, 200 if success else 400)

# Reject a booking request. Only admins and super admins can access this endpoint.
@app.route('/reject_request', methods=['PATCH'])
def reject_request():
    success, msg = RequestsList.reject_request(request_id = request.get_json()['request_id'])
    return make_response({'Response': msg}, 200 if success else 400)

# Cancel an accepted booking request. Only the user who made the request can access this endpoint (and admins and superadmins).
@app.route('/cancel_request', methods=['POST'])
def cancel_request():
    success, msg = RequestsList.cancel_request(request_id = request.get_json()['request_id'])
    # response = {'Resource': msg}
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return make_response({'Response': msg}, 200 if success else 400).headers.add('Access-Control-Allow-Origin', '*')


############## Manage admins ##############

# View the admin list. Only admins and super admins can access this endpoint.
@app.route('/admin_list', methods=['GET'])
def view_admins_list():
    return AdminList.get_admin_list()

# Add a new admin. Only super admins can access this endpoint.
@app.route('/add_admin', methods=['PUT'])
def add_admin():
    success, msg = AdminList.add_admin(admin = request.get_json())
    return make_response({'Response': msg}, 200 if success else 400)

# Delete an admin. Only super admins can access this endpoint.
@app.route('/delete_admin', methods=['DELETE'])
def delete_admin():
    success, msg = AdminList.delete_admin(admin = request.get_json())
    return make_response({'Response': msg}, 200 if success else 400)

# Make a user a super admin. Only super admins can access this endpoint.
@app.route('/make_super_admin', methods=['PATCH'])
def make_super_admin():
    success, msg = AdminList.make_super_admin(emails = request.get_json())
    return make_response({'Response': msg}, 200 if success else 400)

# Check the state (user, admin, or super admin) of a user
@app.route('/check_user_state', methods=['GET'])
def check_user_state():
    state = AdminList.check_user_state(user = request.get_json())
    return {'state': state}.jsonify()


############## Run the app ##############

if __name__ == '__main__':
    app.run(debug=True)   