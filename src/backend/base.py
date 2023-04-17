import os
from forms import  EventForm, AddAdminForm, DelAdminForm
from flask import Flask, flash,render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_dance.contrib.google import make_google_blueprint, google


os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = '1'
os.environ["OAUTHLIB_RELAX_TOKEN_SCOPE"] = '1'


app = Flask(__name__)

# app.app_context().push()

# db.create_all()
#key for CSRF
app.config['SECRET_KEY'] = 'mysecretkey'

# g-outh
# modify client id and secret values
blueprint = make_google_blueprint(
    client_id="901277222516-llp0nhcacp402ilf5uel4d1f8g1vut5e.apps.googleusercontent.com",
    client_secret="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",
    # reprompt_consent=True,
    offline=True,
    scope=["profile", "email"]
)
app.register_blueprint(blueprint, url_prefix="/login")


## database config ##
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# Migrate(app,db)

# Model for booking requests
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

# Model for Admin Management
class AdminManagement(db.Model):
    __tablename__ = 'Admins'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __repr__(self):
        return f"Name:{self.name}  Email:{self.email}"




@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return render_template('landing_page.html')

@app.route('/home')
def home():
    resp = google.get("/oauth2/v2/userinfo")
    assert resp.ok, resp.text
    # email=resp.json()["email"]

    return render_template('homepage.html')


@app.route('/login/google')
def login():
    if not google.authorized:
        return render_template(url_for("google.login"))

    resp = google.get("/oauth2/v2/userinfo")
    assert resp.ok, resp.text
    email=resp.json()["email"]

    return render_template("homepage.html")

@app.route('/logout')
def logout():
    # Logout from google
    google.session.clear()
    
    return render_template('landing_page.html')



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
        flash("Your booking request has been submitted.")
        return redirect(url_for('booking_request'))

        # show a flash message saying request submitted
    return render_template('booking_request.html', form=form)

@app.route('/requests_list')
def requests_list():
    # display all requests
    requests = BookingRequest.query.all()
    return render_template('request_list.html', requests=requests)

@app.route('/add_admin', methods=('GET', 'POST'))
def add_admin():
    form = AddAdminForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
    
        admin_addn = AdminManagement(name=name, email=email)
        db.session.add(admin_addn)
        db.session.commit()

        # flash message
        flash("Admin added")
        return redirect(url_for('add_admin'))

    return render_template('add_admin.html', form=form)

@app.route('/admin_list')
def admin_list():
    list = AdminManagement.query.all()
    return render_template('admin_list.html', list=list)

@app.route('/del_admin',  methods=('GET', 'POST'))
def del_admin():
    form = DelAdminForm()
    if form.validate_on_submit():
        email = form.email.data

        admin = AdminManagement.query.filter(AdminManagement.email == email).first()

        if admin:
            db.session.delete(admin)
            db.session.commit()

            # flash appropriate message
            flash('Admin deleted')
            return redirect(url_for('del_admin'))

        else:
            flash('Admin not found')
            return redirect(url_for('del_admin'))

    return render_template('del_admin.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)