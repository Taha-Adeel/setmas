import os
from forms import  EventForm
from flask import Flask, flash,render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
app = Flask(__name__)

# app.app_context().push()

# db.create_all()
#key for CSRF
app.config['SECRET_KEY'] = 'mysecretkey'


## database config ##
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# Migrate(app,db)

class BookingRequest(db.Model):

    __tablename__ = 'Requests'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    room = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    start_time = db.Column(db.String(20), nullable=False)
    end_time = db.Column(db.String(20), nullable=False)


    def __init__(self, name, email, room, date, start_time, end_time):
        self.name = name
        self.email = email
        self.room = room
        self.date = date
        self.start_time = start_time
        self.end_time = end_time

        # fill fields

    def __repr__(self):
        return f"Request by {self.name}"
        # add info about request

@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return render_template('homepage.html')

@app.route('/booking request', methods=('GET', 'POST'))
def booking_request():
    form = EventForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        room = form.room.data
        date = form.date.data
        start_time = str(form.start_time.data)
        end_time = str(form.end_time.data)

        # add to database
        new_request = BookingRequest(name=name, email=email, date=date, room = room, start_time=start_time, end_time=end_time)
        db.session.add(new_request)
        db.session.commit()

        # flash message
        # flash("Your booking request has been submitted.")
        return redirect(url_for('requests_list'))

        # show a flash message saying request submitted
    return render_template('booking_request.html', form=form)

@app.route('/requests_list')
def requests_list():
    # display all requests
    requests = BookingRequest.query.all()
    return render_template('request_list.html', requests=requests)

if __name__ == '__main__':
    app.run(debug=True)