from . import db

class AdminModel(db.Model):
    __tablename__ = 'Admins'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(80), nullable=False)
    isSuperAdmin = db.Column(db.String(80), nullable=False)

    def __init__(self, email, isSuperAdmin = False):
        self.email = email
        self.isSuperAdmin = isSuperAdmin

    def __repr__(self):
        return f"Id:{self.id} Email:{self.email} isSuperAdmin:{self.isSuperAdmin}"

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'isSuperAdmin': self.isSuperAdmin
        }