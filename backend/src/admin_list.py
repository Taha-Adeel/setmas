from util.database.admin_list_model import AdminModel
from util.database import db
from flask import jsonify, request

class AdminList:
    def get_admin_list():
        admins_list = AdminModel.query.all()
        admins_dicts = [admin.to_dict() for admin in admins_list]
        return jsonify(admins_dicts)
    
    
    def add_admin(admin):
        new_admin = AdminModel(email=admin['email'], isSuperAdmin='NO')

        is_present = AdminModel.query.filter(AdminModel.email == new_admin.email).first()

        if is_present:
            return False, 'User is already an Admin'

        db.session.add(new_admin)
        db.session.commit()

        # TODO: add function to send admin additon mail
        return True, 'Admin Successfully Added'


    def delete_admin(admin):
        del_admin = AdminModel.query.filter(AdminModel.email == admin['email']).first()

        if del_admin is None:
            return False, 'Error: Could not find admin to delete'
        
        if del_admin.isSuperAdmin == 'YES':
            return False, 'Error: Cannot delete SuperAdmin'

        db.session.delete(admin)
        db.session.commit()

        # TODO: add function to send admin deletion mail
        return True


    def make_super_admin(admin_data):
        cur_super = AdminModel.query.filter(AdminModel.email == admin_data['super']).first()

        if cur_super is None or cur_super.isSuperAdmin == 'NO':
            return False, 'Super admin email does not correspond to SuperAdmin'
        
        
        cur_admin = AdminModel.query.filter(AdminModel.email == admin_data['email']).first()

        if cur_admin is None:
            return False, 'User is not an Admin'

        if admin_data['super'] == admin_data['admin']:
            return False, 'Admin is already Super Admin'

        cur_super.isSuperAdmin = 'NO'
        db.session.commit()

        cur_admin.isSuperAdmin = 'YES'
        db.session.commit()

        # TODO: add function to send mail to new super and old super
        return True, 'Super Admin changed'


    def check_user_state(admin):
        state = AdminModel.query.filter(AdminModel.email == admin['email']).first()

        if state is None:
            return 'user'
        else:
            if state.isSuperAdmin == 'YES':
                return 'super'
            else:
                return 'admin'
