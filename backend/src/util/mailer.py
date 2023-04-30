import os
from flask_mail import Mail, Message
from app import app

class Mailer:
    _instance = None

    mail_server = 'smtp.gmail.com'
    mail_port = 587
    mail_use_tls = True
    mail_username = 'setmasiith@gmail.com'
    mail_password = 'nkryqhcbrabdgwkn'

    mail = Mail(app)

    def _init_config():
        app.config['MAIL_SERVER'] = Mailer.mail_server
        app.config['MAIL_PORT'] = Mailer.mail_port
        app.config['MAIL_USE_TLS'] = Mailer.mail_use_tls
        app.config['MAIL_USERNAME'] = Mailer.mail_username
        app.config['MAIL_PASSWORD'] = Mailer.mail_password

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            Mailer._init_config()
            cls._instance = super(Mailer, cls).__new__(cls, *args, **kwargs)

        return cls._instance

    def request_submission_notif(email):
        msg = Message(subject='Booking Request Status', sender='setmasiith@gmail.com', recipients=[email])
        msg.body = 'Dear User,\nYour booking request has been submitted.'
        Mailer.mail.send(msg)
        return 'Email sent'

    def request_accepted_notif(email):
        msg = Message(subject='Booking Request Status', sender='setmasiith@gmail.com', recipients=[email])
        msg.body = 'Dear User,\nYour booking request has been accepted.'
        Mailer.mail.send(msg)
        return 'Email sent'

    def request_rejected_notif(email):
        msg = Message(subject='Booking Request Status', sender='setmasiith@gmail.com', recipients=[email])
        msg.body = 'Dear User,\nYour booking request has been rejected.'
        Mailer.mail.send(msg)
        return 'Email sent'

    def new_admin_status(email):
        msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[email])
        msg.body = 'Dear User,\nYou are now an admin.'
        Mailer.mail.send(msg)
        return 'Email sent'

    def delete_admin_status(email):
        msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[email])
        msg.body = "Dear User,\nYou've been removed as an admin."
        Mailer.mail.send(msg)
        return 'Email sent'

    def super_admin_status(new_superAdmin_email, old_superAdmin_email):
        msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[new_superAdmin_email])
        msg.body = "Dear User,\nYou've been promoted to Super Admin."
        Mailer.mail.send(msg)

        msg = Message(subject='Change in Status', sender='setmasiith@gmail.com', recipients=[old_superAdmin_email])
        msg.body = "Dear User,\nYou've been demoted to Admin."
        Mailer.mail.send(msg)


        return 'Email sent'