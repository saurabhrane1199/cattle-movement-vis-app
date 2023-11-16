import config
db = config.db

class Population(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    premiseid = db.Column(db.Integer, nullable=False)
    total_animal = db.Column(db.Integer, nullable=False)