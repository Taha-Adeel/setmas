from .singletonSQLAlchemy import SingletonSQLAlchemy

db = SingletonSQLAlchemy()

from .admin_list_model import AdminModel
from .request_list_model import BookingRequestModel

def create_db_tables(app):
    with app.app_context():
        db.create_all()
