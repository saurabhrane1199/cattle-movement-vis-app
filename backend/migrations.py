import csv
import datetime
import config

# Import your SQLAlchemy models
from models import Movements, Population

db = config.db

def populatePopulation():
    with open('./data/population.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            # Assuming YourModel has fields corresponding to the columns in your CSV
            existing_item = Population.query.filter_by(Id=row["Id"]).first()
            if not existing_item:
                item = Population(**row)
                db.session.add(item)
    db.session.commit()

def populateMovements():
    with open('./data/movement.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            # Assuming YourModel has fields corresponding to the columns in your CSV
            existing_item = Movements.query.filter_by(Id=row["Id"]).first()
            if not existing_item:
                row['new_shipmentsstartdate'] = datetime.datetime.strptime(row['new_shipmentsstartdate'], "%y-%m-%d").date()
                item = Movements(**row)
                db.session.add(item)
    db.session.commit()

def read_csv_and_populate_db():
    db.create_all()
    populateMovements()
    populatePopulation()


    

