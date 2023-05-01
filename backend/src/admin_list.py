from util.database.admin_list_model import AdminModel
from util.database import db
from flask import jsonify
from util.mailer import Mailer

class AdminList:
    """
    This class contains methods for managing the admin list, including adding, deleting, and modifying admin accounts.
    It also provides functionality to check the state of a user (admin, super admin, or regular user).
    """

    def get_admin_list():
        """
        Retrieve the list of all admins from the database.

        Returns:
            Response: A JSON response containing the list of all admins as a JSON object.
        """

        admins_list = AdminModel.query.all()
        admins_dicts = [admin.to_dict() for admin in admins_list]
        return jsonify(admins_dicts)

    def add_admin(admin: dict):
        """
        Add a new admin to the database.

        Args:
            admin (dict): Dictionary containing the details of the admin to be added.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation and a string message response.
        """

        # Check if the user is already an admin
        existing_admin = AdminModel.query.filter(AdminModel.email == admin['email']).first()
        if existing_admin is not None:
            return False, 'Error: Admin already exists'

        # Add the new admin to the database and send a mail
        new_admin = AdminModel(email=admin['email'], isSuperAdmin='NO')
        db.session.add(new_admin)
        db.session.commit()
        Mailer.new_admin_status(admin['email'])

        return True, 'Admin successfully added'

    def delete_admin(admin: dict):
        """
        Delete an admin from the database.

        Args:
            admin (dict): Dictionary containing the details of the admin to be deleted.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation and a string message.
        """

        # Check if the admin exists and is not a super admin
        del_admin = AdminModel.query.filter(AdminModel.email == admin['email']).first()
        if del_admin is None:
            return False, 'Error: Could not find admin to delete'
        if del_admin.isSuperAdmin == 'YES':
            return False, 'Error: Cannot delete SuperAdmin'

        # Delete the admin from the database and send a mail
        db.session.delete(admin)
        db.session.commit()
        Mailer.delete_admin_status(admin['email'])

        return True, 'Admin successfully deleted'

    def make_super_admin(emails: dict):
        """
        Transfer super admin to another user, while demoting the current super admin to a regular admin.

        Args:
            emails (dict): Dictionary containing the email ids of the user and super admin.

        Returns:
            tuple: A tuple containing a boolean indicating the success of the operation and a string message.
        """

        # Check if the super admin email is valid
        cur_super = AdminModel.query.filter(AdminModel.email == emails['super']).first()
        if cur_super is None or cur_super.isSuperAdmin == 'NO':
            return False, 'User is not a Super Admin'

        # Check if the admin email is valid
        new_super = AdminModel.query.filter(AdminModel.email == emails['email']).first()
        if new_super is None:
            return False, 'User email is not valid'

        # Check if the user is already the super admin
        if emails['super'] == emails['admin']:
            return False, 'User is already a Super Admin'

        # Change the super admin and send them mails
        cur_super.isSuperAdmin = 'NO'
        new_super.isSuperAdmin = 'YES'
        db.session.commit()
        Mailer.super_admin_status(old_superAdmin_email=emails['super'], new_superAdmin_email=emails['email'])

        return True, 'Super Admin changed'

    def check_user_state(user: dict):
        """
        Check the state of a user (admin, super admin, or regular user).

        Args:
            admin (dict): Dictionary containing the details of the user.

        Returns:
            str: The state of the user ('admin', 'super', or 'user').
        """
        admin = AdminModel.query.filter(AdminModel.email == user['email']).first()
        if admin is None:
            return 'user'
        return 'super' if admin.isSuperAdmin == 'YES' else 'admin'
