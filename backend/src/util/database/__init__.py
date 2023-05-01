"""
This is the package initialization file for the database module.

The database module provides functionality for creating and interacting with database tables using SQLAlchemy.

Modules:
- `singletonSQLAlchemy`: Defines a singleton class for SQLAlchemy instance.
- `admin_list_model`: Defines the `AdminModel` class representing the admin table in the database.
- `request_list_model`: Defines the `BookingRequestModel` class representing the booking request table in the database.
"""

from .singletonSQLAlchemy import SingletonSQLAlchemy

db = SingletonSQLAlchemy() # The SQLAlchemy instance used to interact with the database.

from .admin_list_model import AdminModel
from .request_list_model import BookingRequestModel

def create_db_tables(app):
    """
    Creates the database tables based on the defined models. 
    
    Args:
        app: The Flask application object.
    """
    with app.app_context():
        db.create_all()
