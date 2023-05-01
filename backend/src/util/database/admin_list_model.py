"""
The admin_list_model.py module defines the AdminModel class representing the admin table in the database.
"""

from . import db

class AdminModel(db.Model):
    """
    Represents an admin entry in the database.

    Attributes:
    - `id`: Primary key of the admin entry (Integer).
    - `email`: Email address of the admin (String).
    - `isSuperAdmin`: Flag indicating whether the admin is a super admin (String).
    """

    # The name of the table in the database.
    __tablename__ = 'Admins'

    # The columns of the table.
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(80), nullable=False)
    isSuperAdmin = db.Column(db.String(80), nullable=False)


    def __init__(self, email, isSuperAdmin = False):
        """
        Initializes a new instance of the `AdminModel` class. \n
        Args:
            email: Email address of the admin.
            isSuperAdmin: Flag indicating whether the admin is a super admin (default: False).
        """
        self.email = email
        self.isSuperAdmin = isSuperAdmin

    def __repr__(self):
        """ Returns a string representation of the admin entry. """
        return f'Id:{self.id} Email:{self.email} isSuperAdmin:{self.isSuperAdmin}'

    def to_dict(self):
        """ Converts the admin entry to a dictionary. """
        return {
            'id': self.id,
            'email': self.email,
            'isSuperAdmin': self.isSuperAdmin
        }