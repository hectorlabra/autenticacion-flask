from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User


def setup_admin(app):
    app.config['SECRET_KEY'] = 'your_secret_key'
    admin = Admin(app, name='Your App Name', template_mode='bootstrap3')
    admin.add_view(ModelView(User, db.session))
