from flask import Flask, request, jsonify, make_response
# from flask_restful import Resource, Api, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
# from wtforms import validators, Email, Time, BooleanField
from datetime import datetime
import os
from flask_cors import CORS

app = Flask(__name__)
# api = Api(app)
cors = CORS(app)

#key for CSRF
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['CORS_ORIGINS'] = ['http://localhost:3000']


## database config ##
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
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
    rootAdmin_Status = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, rootAdmin_Status):
        self.name = name
        self.email = email
        self.rootAdmin_Status = rootAdmin_Status

    def __repr__(self):
        return f"Name:{self.name}  Email:{self.email}"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'rootAdmin_Status': self.rootAdmin_Status
        }



@app.before_first_request
def create_tables():
    db.create_all()

############## Booking Request Functions ##############

# Creating a request
# @marshal_with(booking_request_resource_fields)
@app.route('/create_request', methods=['POST'])
def create_request():
    data = request.get_json()
    # id subject to modification
    booking_request = BookingRequestsModel(name=data['name'], email=data['email'], date=data['date'], start_time=data['start_time'], end_time=data['end_time'], room=data['room'], title=data['title'], details=data['details'])

    #checks and modifications
    booking_request.status = 'Pending'

    # add to database
    db.session.add(booking_request)
    db.session.commit()

    # return booking_request

#show all  requests
# @marshal_with(booking_request_resource_fields)
@app.route('/request_list', methods=['GET'])
def view_requests_list():
    requests_list = BookingRequestsModel.query.all()
    requests_dict = [request.to_dict() for request in requests_list]
    return jsonify(requests_dict)

# @marshal_with(booking_request_resource_fields)
@app.route('/reject_request', methods=['POST'])
def reject_request():
    data = request.get_json()
    entry = BookingRequestsModel.query.filter(BookingRequestsModel.requestID == data['requestID']).first()
    db.session.delete(entry)
    db.session.commit()

#get requests by use[
# @marshal_wi]h(booking_request_resource_fields)
@app.route('/user_requests', methods=['GET'])
def view_user_requests():
    data = request.get_json()
    user_requests = BookingRequestsModel.filter.query(BookingRequestsModel.name == data['name'])
    return jsonify(user_requests)

    
############## Admin Management Functions ##############


# viewing admin list
# @marshal_with(admin_list_resource_fields)
@app.route('/admin_list', methods=['GET'])
def view_admins_list():
    admins_list = AdminManagement.query.all()
    admins_dicts = [admin.to_dict() for admin in admins_list]
    return jsonify(admins_dicts)

@app.route('/add_admin', methods=['POST'])
def add_admin():
    data = request.get_json()
    new_admin = AdminManagement(name=data['name'], email=data['email'], rootAdmin_Status='NO')
    db.session.add(new_admin)
    db.session.commit()
    result = {'status': 'success'}
    response = make_response(result, 200) # 200 is the status code
    return response


@app.route('/delete_admin', methods=['POST'])
def delete_admin():
    data = request.get_json()
    del_admin = AdminManagement.filter.query(AdminManagement.email == data['email']).first()
    db.session.delete(del_admin)
    db.session.commit()

@app.route('/make_rootAdmin', methods=['POST'])
def make_rootAdmin():
    data = request.get_json()
    # make current super admin to just admin
    admin = AdminManagement.filter.query(AdminManagement.email == data['superEmail']).first()
    if admin:
        admin.root_AdminStatus = 'NO'
    #transfer super admin powers
    new_rootAdmin = AdminManagement.filter.query(AdminManagement.email == data['email'])
    if new_rootAdmin:
        new_rootAdmin.root_AdminStatus = 'YES'


        
if __name__ == '__main__':
    app.run(debug=True)   




