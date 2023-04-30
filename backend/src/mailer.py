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

@app.route('/')
def send_mail():
    msg = Message(subject='Testing Mail Service', sender='setmasiith@gmail.com', recipients=['cs20btech11045@iith.ac.in', 'cs20btech11052@iith.ac.in', 'cs20btech11039@iith.ac.in', 'cs20btech11021@iith.ac.in'])
    msg.body = 'Have a nice day :)'

    mail.send(msg)
    return "Email sent"

if __name__ == '__main__':
   app.run(debug = True)