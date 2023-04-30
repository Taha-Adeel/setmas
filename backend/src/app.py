import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from util.database.admin_list_model import AdminManagement
from util.database.request_list_model import BookingRequestsModel
from util.database import db, create_db_tables

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

@app.route('/checkUserLevel', methods=['GET', 'POST'])
def checkUserLevel():
    data = request.get_json()

    find = AdminManagement.query.filter(AdminManagement.email == data['email']).first()
    if find is None:
        reply = {'level': 'user'}
    else:
        if find.rootAdminStatus == 'YES':
            reply = {'level': 'superadmin'}
        else:
            reply = {'level': 'admin'}
    
    return reply.jsonify()

    
        
if __name__ == '__main__':
    app.run(debug=True)   