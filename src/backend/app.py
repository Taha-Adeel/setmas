from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from wtforms import validators, Email, Time, BooleanField
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

db.create_all()
##end

# args for booking-requests
request_args = reqparse.RequestParser()
request_args.add_argument('name', type=str, required=True)
request_args.add_argument('department', type=str, required=True)
request_args.add_argument('email', type=Email(), required=True)
request_args.add_argument('date', type=lambda x: datetime.strptime(x, '%Y-%m-%d'), required=True)
request_args.add_argument('start_time', type=Time(format='%H:%M'), required=True)
request_args.add_argument('end_time', type=Time(format='%H:%M'), required=True)
request_args.add_argument('room', type=str, required=True)
request_args.add_argument('title', type=str, required=True)
request_args.add_argument('details', type=str, required=True)
# request_args.add_argument('Seminar-List', type=str, required=True)
request_args.add_argument('requestID', type=int)    #null, needs to be assigned
request_args.add_argument('status', type=validators.OneOf(['Pending', 'Accepted', 'Rejected'])) #null, assign it to pending

# response marshaller for booking requests
booking_request_resource_fields = {
    'name': fields.String,
    'email': fields.String,
    'date': fields.String,
    'start_time': fields.String,
    'end_time': fields.String,
    'room': fields.String,
    'title': fields.String,
    'details': fields.String,
    # 'RequestID': fields.Integer,
    'status': fields.String
}

# args for admin-list
admin_args = reqparse.RequestParser()
admin_args.add_argument('name', type=str, required=True)
admin_args.add_argument('email', type=Email(), required=True)
admin_args.add_argument('rootAdmin_Status', type=bool)

# response marshaller for admin list
admin_list_resource_fields = {
    'name': fields.String,
    'email': fields.String,
    'rootAdmin_Status': fields.Boolean
}

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

# Model for Admin Management
class AdminManagement(db.Model):
    __tablename__ = 'Admins'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, rootAdmin_Status):
        self.name = name
        self.email = email
        self.rootAdmin_Status = rootAdmin_Status

    def __repr__(self):
        return f"Name:{self.name}  Email:{self.email}"





# Creating a request
@marshal_with(booking_request_resource_fields)
@app.route('/create_request', methods=['POST'])
def create_request():
    args = request_args.parse_args()
    # id subject to modification
    booking_request = BookingRequestsModel(name=args['name'], email=args['email'], date=args['date'], start_time=args['start_time'], end_time=args['end_time'], room=args['room'], title=args['title'], details=args['details'], status=args['status'])

    #checks and modifications
    if booking_request.status is None:
        booking_request.status = 'Pending'

    # add to database
    db.session.add(booking_request)
    db.commit()

#show all  requests
@marshal_with(booking_request_resource_fields)
@app.route('/request_list', methods=['GET'])
def requests_list():
    requests = BookingRequestsModel.query.all()
    return jsonify(requests)

@marshal_with(booking_request_resource_fields)
@app.route('/reject_request', methods=['POST'])
def reject_request():
    args = request_args.parse_args()
    request = BookingRequestsModel.query.filter(BookingRequestsModel.requestID == args['requestID']).first()
    db.session.delete(request)
    db.commit()

#get requests by user
@marshal_with(booking_request_resource_fields)
@app.route('/user_requests', methods=['GET'])
def user_requests():
    data = request.json()
    requests = BookingRequestsModel.filter.query(BookingRequestsModel.name == data['name'])
    
# viewing admin list
@marshal_with(admin_list_resource_fields)
@app.route('/admin_list', methods=['GET'])
def view_admins_list():
    




