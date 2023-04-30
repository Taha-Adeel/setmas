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
    msg = Message(subject='Your Mom', sender='setmasiith@gmail.com', recipients=['shambuk157@gmail.com'])
    msg.body = 'Your mom is GAyyyy'
    mail.send(msg)
    return "Email sent"

if __name__ == '__main__':
   app.run(debug = True)