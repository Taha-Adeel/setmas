from .singletonSQLAlchemy import SingletonSQLAlchemy
from .admin_list_model import AdminManagement
from .request_list_model import BookingRequestsModel

db = SingletonSQLAlchemy()

def create_tables(app):
    with app.app_context():
        db.create_all()
