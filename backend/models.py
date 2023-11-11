import config

db = config.db

class Movements(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    account_company =db.Column(db.String(255), nullable=False)              
    new_movementreason =db.Column(db.String(255), nullable=False)
    new_species =db.Column(db.String(255), nullable=False)
    new_originaddress =db.Column(db.String(255), nullable=False)
    new_origincity =db.Column(db.String(255), nullable=False)
    new_originname =db.Column(db.String(255), nullable=False)
    new_originpostalcode =db.Column(db.String(255), nullable=False)
    new_originstate =db.Column(db.String(255), nullable=False)
    new_destinationaddress =db.Column(db.String(255), nullable=False)
    new_destinationcity=db.Column(db.String(255), nullable=False)
    new_destinationname=db.Column(db.String(255), nullable=False)
    new_destinationpostalcode=db.Column(db.String(255), nullable=False)
    new_destinationstate=db.Column(db.String(255), nullable=False)
    origin_Lat=db.Column(db.Float, nullable=False)
    origin_Lon=db.Column(db.Float, nullable=False)
    destination_Lat=db.Column(db.Float, nullable=False)
    destination_Long=db.Column(db.Float, nullable=False)
    new_shipmentsstartdate =db.Column(db.Date, nullable=False)
    new_originpremid = db.Column(db.String(255), nullable=False)
    new_destinationpremid = db.Column(db.String(255), nullable=False)
    new_numitemsmoved = db.Column(db.Integer, nullable=False)


class Population(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    premiseid = db.Column(db.Integer, nullable=False)
    total_animal = db.Column(db.Integer, nullable=False)



    