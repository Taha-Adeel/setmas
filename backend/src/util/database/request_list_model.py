from . import db
from datetime import datetime

class BookingRequestModel(db.Model):
    __tablename__ = 'Booking_Requests'

    request_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(80), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    room = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    details = db.Column(db.String(800), nullable=False)
    status = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, date, start_time, end_time, room, title, details, status):
        self.name = name
        self.email = email
        self.start_time = datetime.strptime(start_time, '%H-%M').time()
        self.end_time = datetime.strptime(end_time, '%H-%M').time()
        self.room = room
        self.title = title
        self.details = details
        self.status = status

    def __repr__(self):
        return f"Request by {self.name} for {self.room} on {self.date} from {self.start_time} to {self.end_time} with title {self.title} and details {self.details}"
   
    def to_dict(self):
        return {
            'request_id': self.request_id,
            'name': self.name,
            'email': self.email,
            'date': self.date,
            'start_time': self.start_time.strftime('%H-%M'),
            'end_time': self.end_time.strftime('%H-%M'),
            'room': self.room,
            'title': self.title,
            'details': self.details,
            'status': self.status
        }