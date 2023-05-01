"""
The request_list_model.py module defines the BookingRequestModel class representing the booking request table in the database.
"""

from . import db
from datetime import datetime

class BookingRequestModel(db.Model):
    """
    Represents a booking request entry in the database.

    Attributes:
    - `request_id`: Primary key of the booking request entry (Integer).
    - `name`: Name of the requester (String).
    - `email`: Email address of the requester (String).
    - `date`: Date of the booking request (String) (YYYY-MM-DD).
    - `start_time`: Start time of the booking request (Time) (HH-MM).
    - `end_time`: End time of the booking request (Time) (HH-MM).
    - `room`: Room of the booking request (String).
    - `title`: Title of the booking request (String).
    - `details`: Details of the booking request (String).
    - `status`: Status of the booking request (String) (Accepted/Pending/Rejected/Cancelled).
    """

    # The name of the table in the database.
    __tablename__ = 'Booking_Requests'

    # The columns of the table.
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
        """ Initializes a new instance of the `BookingRequestModel` class. """
        self.name = name
        self.email = email
        self.start_time = datetime.strptime(start_time, '%H:%M').time()
        self.end_time = datetime.strptime(end_time, '%H:%M').time()
        self.date = date
        self.room = room
        self.title = title
        self.details = details
        self.status = status

    def __repr__(self):
        """ Returns a string representation of the booking request entry. """
        return f"Request by {self.name} for {self.room} on {self.date} from {self.start_time} to {self.end_time} with title {self.title} and details {self.details}"
   
    def to_dict(self):
        """ Converts the booking request entry to a dictionary. """
        return {
            'request_id': self.request_id,
            'name': self.name,
            'email': self.email,
            'date': self.date,
            'start_time': self.start_time.strftime('%H:%M'),
            'end_time': self.end_time.strftime('%H:%M'),
            'room': self.room,
            'title': self.title,
            'details': self.details,
            'status': self.status
        }