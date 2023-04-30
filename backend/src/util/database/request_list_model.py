from . import db

class BookingRequestModel(db.Model):
    __tablename__ = 'Booking_Requests'
    requestID = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    start_time = db.Column(db.String(20), nullable=False)
    end_time = db.Column(db.String(20), nullable=False)
    room = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    details = db.Column(db.String(800), nullable=False)
    status = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, date, start_time, end_time, room, title, details, status):
        self.name = name
        self.email = email
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.room = room
        self.title = title
        self.details = details
        self.status = status


        # fill fields

    def __repr__(self):
        return f"Request by {self.name}"
        # add info about request

    def to_dict(self):
        return {
            'requestID': self.requestID,
            'name': self.name,
            'email': self.email,
            'date': self.date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'room': self.room,
            'title': self.title,
            'details': self.details,
            'status': self.status
        }