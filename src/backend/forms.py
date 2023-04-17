from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateField
from wtforms_components import TimeField

from wtforms.validators import DataRequired
from wtforms import StringField, PasswordField, BooleanField, \
    SubmitField
from wtforms.validators import ValidationError, DataRequired, \
    Email, EqualTo, Length

class EventForm(FlaskForm):
    name = StringField('Name:')
    email = StringField('Email:', validators=[DataRequired(), Email()])
    room = StringField('Room:', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    # start_time = TimeField('Start Time', validators=[DataRequired()])
    # end_time = TimeField('End Time', validators=[DataRequired()])
    submit = SubmitField('Submit')
