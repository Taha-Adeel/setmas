from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'setmasiith@gmail.com'
app.config['MAIL_PASSWORD'] = 'nkryqhcbrabdgwkn'

mail = Mail(app)

def request_submission_notif(email):
    msg = Message(subject='Booking Request Status', sender='setmasiith@gmail.com', recipients=[email])
    msg.body = 'Dear User,\nYour booking request has been submitted.'
    mail.send(msg)
    return 'Email sent'

def request_accepted_notif(email):
    msg = Message(subject='Booking Request Status', sender='setmasiith@gmail.com', recipients=[email])
    msg.body = 'Dear User,\nYour booking request has been accepted.'
    mail.send(msg)
    return 'Email sent'

def request_rejected_notif(email):
    msg = Message(subject='Booking Request Status', sender='setmasiith@gmail.com', recipients=[email])
    msg.body = 'Dear User,\nYour booking request has been rejected.'
    mail.send(msg)
    return 'Email sent'

def new_admin_status(email):
    msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[email])
    msg.body = 'Dear User,\nYou are now an admin.'
    mail.send(msg)
    return 'Email sent'

def delete_admin_status(email):
    msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[email])
    msg.body = "Dear User,\nYou've been removed as an admin."
    mail.send(msg)
    return 'Email sent'

def super_admin_status(new_superAdmin_email, old_superAdmin_email):
    msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[new_superAdmin_email])
    msg.body = "Dear User,\nYou've been promoted to Super Admin."
    mail.send(msg)

    msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[old_superAdmin_email])
    msg.body = "Dear User,\nYou've been demoted to Admin."
    mail.send(msg)


    return 'Email sent'


if __name__ == '__main__':
   app.run(debug = True)