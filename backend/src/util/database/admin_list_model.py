from . import db

class AdminManagement(db.Model):
    __tablename__ = 'Admins'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    rootAdminStatus = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, rootAdminStatus):
        self.name = name
        self.email = email
        self.rootAdminStatus = rootAdminStatus

    def __repr__(self):
        return f"Name:{self.name}  Email:{self.email}"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'rootAdminStatus': self.rootAdminStatus
        }