from flask_sqlalchemy import SQLAlchemy
from flask import Flask


# create connexion app instance

app = Flask(__name__)

app.secret_key = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)