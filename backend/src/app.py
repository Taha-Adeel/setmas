from flask import Flask, request, jsonify, make_response
# from flask_restful import Resource, Api, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
# from wtforms import validators, Email, Time, BooleanField
from datetime import datetime
import os
from flask_cors import CORS

app = Flask(__name__, template_folder='../templates')
# api = Api(app)
cors = CORS(app)

#key for CSRF
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['CORS_ORIGINS'] = ['http://localhost:3000']


## database config ##
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, '../data/database.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# db.create_all()
##end

# args for booking-requests
# request_args = reqparse.RequestParser()
# request_args.add_argument('name', type=str, required=True)
# request_args.add_argument('department', type=str, required=True)
# request_args.add_argument('email', type=Email(), required=True)
# request_args.add_argument('date', type=lambda x: datetime.strptime(x, '%Y-%m-%d'), required=True)
# request_args.add_argument('start_time', type=Time(format='%H:%M'), required=True)
# request_args.add_argument('end_time', type=Time(format='%H:%M'), required=True)
# request_args.add_argument('room', type=str, required=True)
# request_args.add_argument('title', type=str, required=True)
# request_args.add_argument('details', type=str, required=True)
# # request_args.add_argument('Seminar-List', type=str, required=True)
# request_args.add_argument('requestID', type=int)    #null, needs to be assigned
# request_args.add_argument('status', type=validators.OneOf(['Pending', 'Accepted', 'Rejected'])) #null, assign it to pending

# # response marshaller for booking requests
# booking_request_resource_fields = {
#     'name': fields.String,
#     'email': fields.String,
#     'date': fields.String,
#     'start_time': fields.String,
#     'end_time': fields.String,
#     'room': fields.String,
#     'title': fields.String,
#     'details': fields.String,
#     # 'RequestID': fields.Integer,
#     'status': fields.String
# }

# # args for admin-list
# admin_args = reqparse.RequestParser()
# admin_args.add_argument('name', type=str, required=True)
# admin_args.add_argument('email', type=Email(), required=True)
# admin_args.add_argument('rootAdmin_Status', type=bool)

# # response marshaller for admin list
# admin_list_resource_fields = {
#     'name': fields.String,
#     'email': fields.String,
#     'rootAdmin_Status': fields.Boolean
# }

class BookingRequestsModel(db.Model):
    __tablename__ = 'Booking_Requests'
    requestID = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    start_time = db.Column(db.String(20), nullable=False)
    end_time = db.Column(db.String(20), nullable=False)
    room = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    details = db.Column(db.String(800), nullable=False)
    status = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, date, start_time, end_time, room, title, details, status):
        self.name = name
        self.email = email
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.room = room
        self.title = title
        self.details = details
        self.status = status


        # fill fields

    def __repr__(self):
        return f"Request by {self.name}"
        # add info about request

    def to_dict(self):
        return {
            'requestID': self.requestID,
            'name': self.name,
            'email': self.email,
            'date': self.date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'room': self.room,
            'title': self.title,
            'details': self.details,
            'status': self.status
        }

# Model for Admin Management
class AdminManagement(db.Model):
    __tablename__ = 'Admins'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    rootAdminStatus = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, rootAdminStatus):
        self.name = name
        self.email = email
        self.rootAdminStatus = rootAdminStatus

    def __repr__(self):
        return f"Name:{self.name}  Email:{self.email}"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'rootAdminStatus': self.rootAdminStatus
        }



@app.before_first_request
def create_tables():
    db.create_all()

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
# @marshal_with(admin_list_resource_fields)
@app.route('/admin_list', methods=['GET'])
def view_admins_list():
    admins_list = AdminManagement.query.all()
    admins_dicts = [admin.to_dict() for admin in admins_list]
    return jsonify(admins_dicts)

@app.route('/add_admin', methods=['PUT'])
def add_admin():
    data = request.get_json()
    admin_count = AdminManagement.query.count()  # Get the number of admins currently in the database

    if admin_count == 0:
        new_admin = AdminManagement(name=data['name'], email=data['email'], rootAdminStatus='YES')
    else:
        new_admin = AdminManagement(name=data['name'], email=data['email'], rootAdminStatus='NO')
    
    

    db.session.add(new_admin)
    db.session.commit()
    success = {'status': 'success'}
    failure = {'status': 'could not add admin'}
    # response = make_response(success, 200) # 200 is the status code
    if new_admin:
        return make_response(success, 200)
    return make_response(failure, 404)


@app.route('/delete_admin', methods=['DELETE'])
def delete_admin():
    data = request.get_json()
    del_admin = AdminManagement.query.filter(AdminManagement.email == data['email']).first()
    failure = {'status': 'Admin not found'}
    if del_admin is None:
        return make_response(failure, 404)
    
    db.session.delete(del_admin)
    db.session.commit()
    success = {'status': 'success'}
    return make_response(success, 200)
    

@app.route('/makeRootAdmin', methods=['PATCH'])
def makeRootAdmin():
    data = request.get_json()
    # make current super admin to just admin
    admin = AdminManagement.query.filter(AdminManagement.email == data['superEmail']).first()
    # print('old admin')
    # print(admin)
    if admin:
        admin.rootAdminStatus = 'NO'
        db.session.commit()

    #transfer super admin powers
    newRootAdmin = AdminManagement.query.filter(AdminManagement.email == data['email']).first()
    print(newRootAdmin.rootAdminStatus)
    if newRootAdmin:
        newRootAdmin.rootAdminStatus = 'YES'
        db.session.commit()

    success = {'status': 'success'}
    return make_response(success, 200)
        
if __name__ == '__main__':
    app.run(debug=True)   