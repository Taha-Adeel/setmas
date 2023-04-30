from . import db

class AdminModel(db.Model):
    __tablename__ = 'Admins'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    isSuperAdmin = db.Column(db.String(80), nullable=False)

    def __init__(self, name, email, isSuperAdmin):
        self.name = name
        self.email = email
        self.isSuperAdmin = isSuperAdmin

    def __repr__(self):
        return f"Name:{self.name}  Email:{self.email}"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'isSuperAdmin': self.isSuperAdmin
        }