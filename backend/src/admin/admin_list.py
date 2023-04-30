from util.database.admin_list_model import AdminModel
from util.database import db
from flask import jsonify

class AdminList:
    def get_admin_list():
        admins_list = AdminModel.query.all()
        admins_dicts = [admin.to_dict() for admin in admins_list]
        return jsonify(admins_dicts)
    
    def add_admin(admin):
        db.session.add(admin)
        db.session.commit()

    def delete_admin(admin):
        db.session.delete(admin)
        db.session.commit()

    def make_super_admin(admin):
        admin.rootAdminStatus = 'YES'
        db.session.commit()

    def check_user_level(admin):
        if admin.rootAdminStatus == 'YES':
            return 'super_admin'
        else:
            return 'admin'