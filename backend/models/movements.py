from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Movements(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    new_originpremid = db.Column(db.Integer, nullable=False)
    new_destinationpremid = db.Column(db.Integer, nullable=False)
    new_numitemsmovedcolumn = db.Column(db.Integer, nullable=False)

    def __init__(self, origin_id, destination_id, num_items_moved):
        self.new_originpremid = origin_id
        self.new_destinationpremid = destination_id
        self.new_numitemsmovedcolumn = num_items_moved