"""
This module provides a simple interface for sending email notifications using Flask-Mail.
"""

import os
from flask_mail import Mail, Message
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
from datetime import datetime, timedelta

def init_mailer(app):
    Mailer.mail = Mail(app)

# Initialize the scheduler
scheduler = BackgroundScheduler()
scheduler.start()
atexit.register(lambda: scheduler.shutdown())


class Mailer:
    """ The Mailer class is responsible for sending various email notifications. """
    mail_username = 'setmasiith@gmail.com'

    def request_submission_notif(email, request):
        """
        Sends an email notification to the user about their submitted booking request.

        Args:
            email (str): The recipient's email address.
            request (str): The details of the booking request.

        Returns:
            str: The status message indicating if the email was sent successfully or if an error occurred.
        """
        try:
            msg = Message(subject='Booking Request Status', sender = Mailer.mail_username, recipients=[email])
            msg.body = f'Dear User,\nYour booking request for {request} has been submitted.'
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'

    def request_accepted_notif(email, request):
        """
        Sends an email notification to the user about their accepted booking request.
        """
        try:
            msg = Message(subject='Booking Request Status', sender = Mailer.mail_username, recipients=[email])
            msg.body = f'Dear User,\nYour booking request for {request} has been accepted.'
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'

    def request_rejected_notif(email, request):
        """
        Sends an email notification to the user about their rejected booking request.
        """
        try:
            msg = Message(subject='Booking Request Status', sender = Mailer.mail_username, recipients=[email])
            msg.body = f'Dear User,\nYour booking request for {request} has been rejected.'
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'
        
    def request_cancelled_notif(email, request):
        """
        Sends an email notification to the user about their cancelled booking request.
        """
        try:
            msg = Message(subject='Booking Request Status', sender = Mailer.mail_username, recipients=[email])
            msg.body = f'Dear User,\nYour booking request for {request} has been cancelled.'
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'

    def new_admin_status(email):
        """
        Sends an email notification to the user about their new admin status.
        """
        try:
            msg = Message(subject='Change in Status', sender = Mailer.mail_username, recipients=[email])
            msg.body = "Dear User,\nYou've been added as an admin."
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'

    def delete_admin_status(email):
        """
        Sends an email notification to the user about their deleted admin status.
        """
        try:
            msg = Message(subject='Change in Status', sender = Mailer.mail_username, recipients=[email])
            msg.body = "Dear User,\nYou've been removed as an admin."
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'

    def super_admin_status(new_superAdmin_email, old_superAdmin_email):
        """
        Sends an email notification to the user about their new super admin status, and to the old super admin about their demoted admin status.
        """
        try:
            msg = Message(subject='Change in Status', sender = Mailer.mail_username, recipients=[new_superAdmin_email])
            msg.body = "Dear User,\nYou've been promoted to Super Admin."
            Mailer.mail.send(msg)

            msg = Message(subject='Change in Status', sender = Mailer.mail_username, recipients=[old_superAdmin_email])
            msg.body = "Dear User,\nYou've been demoted to Admin."
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'

    def send_scheduled_email(email, subject, body, scheduled_time: datetime):
        job = scheduler.add_job(Mailer._send_email, 'date', run_date=scheduled_time,
                                args=[email, subject, body])
        return job.id
    
    def _send_email(email, subject, body):
        try:
            msg = Message(subject=subject, sender = Mailer.mail_username, recipients=[email])
            msg.body = body
            Mailer.mail.send(msg)
            return 'Email sent'
        except Exception as e:
            return  f'Error sending email: {str(e)}'
        
    def send_reminder_mail(email, request):
        """
        Sends a scheduled email notification to the user about their accepted booking request.
        """
        try:
            start_time = datetime.strptime(str(request.start_time), '%H:%M').time()
            date = datetime.strptime(request.date, '%Y-%m-%d').date()
            reminder_time = datetime.combine(date, start_time) - timedelta(hours=2)
            Mailer.send_scheduled_email(email, 'Reminder', f'Dear User,\nYour booking request for {request} is scheduled to start in 2 hours.', reminder_time)
        except Exception as e:
            return  f'Error sending email: {str(e)}'