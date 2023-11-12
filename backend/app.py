from flask import Flask, jsonify, request, redirect, url_for, render_template, flash, session
from uuid import uuid4
from urllib.parse import urlparse
from flask_sqlalchemy import SQLAlchemy
from migrations import read_csv_and_populate_db
from sqlalchemy.exc import SQLAlchemyError
import config
from models import Movements, Population
from flask_cors import CORS

app = config.app
db = config.db

CORS(app)



@app.route('/', methods=['GET'])
def home():
    return jsonify({"test" : "success"})


# Create a movement
@app.route('/movements', methods=['POST'])
def create_movement():
    try:
        data = request.json
        new_movement = Movements(**data)
        db.session.add(new_movement)
        db.session.commit()
        return jsonify({"message": "Movement created successfully"})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get all movements
@app.route('/movements', methods=['GET'])
def get_all_movements():
    movements = Movements.query.all()
    movement_list = [{
        "Id": movement.Id,
        "account_company": movement.account_company,
        "new_movementreason": movement.new_movementreason,
        "new_species": movement.new_species,
        "new_originaddress": movement.new_originaddress,
        "new_origincity": movement.new_origincity,
        "new_originname": movement.new_originname,
        "new_originpostalcode": movement.new_originpostalcode,
        "new_originstate": movement.new_originstate,
        "new_destinationaddress": movement.new_destinationaddress,
        "new_destinationcity": movement.new_destinationcity,
        "new_destinationname": movement.new_destinationname,
        "new_destinationpostalcode": movement.new_destinationpostalcode,
        "new_destinationstate": movement.new_destinationstate,
        "origin_Lat": movement.origin_Lat,
        "origin_Lon": movement.origin_Lon,
        "destination_Lat": movement.destination_Lat,
        "destination_Long": movement.destination_Long,
        "new_shipmentsstartdate": movement.new_shipmentsstartdate.strftime("%Y-%m-%d"),  # Convert to string for JSON
        "new_originpremid": movement.new_originpremid,
        "new_destinationpremid": movement.new_destinationpremid,
        "new_numitemsmoved": movement.new_numitemsmoved,
    } for movement in movements]
    return jsonify({"movements": movement_list})

# Get a single movement
@app.route('/movements/<int:movement_id>', methods=['GET'])
def get_movement(movement_id):
    movement = Movements.query.get_or_404(movement_id)
    movement_data = {
        "Id": movement.Id,
        "account_company": movement.account_company,
        "new_movementreason": movement.new_movementreason,
        "new_species": movement.new_species,
        "new_originaddress": movement.new_originaddress,
        "new_origincity": movement.new_origincity,
        "new_originname": movement.new_originname,
        "new_originpostalcode": movement.new_originpostalcode,
        "new_originstate": movement.new_originstate,
        "new_destinationaddress": movement.new_destinationaddress,
        "new_destinationcity": movement.new_destinationcity,
        "new_destinationname": movement.new_destinationname,
        "new_destinationpostalcode": movement.new_destinationpostalcode,
        "new_destinationstate": movement.new_destinationstate,
        "origin_Lat": movement.origin_Lat,
        "origin_Lon": movement.origin_Lon,
        "destination_Lat": movement.destination_Lat,
        "destination_Long": movement.destination_Long,
        "new_shipmentsstartdate": movement.new_shipmentsstartdate.strftime("%Y-%m-%d"),  # Convert to string for JSON
        "new_originpremid": movement.new_originpremid,
        "new_destinationpremid": movement.new_destinationpremid,
        "new_numitemsmoved": movement.new_numitemsmoved,
    }
    return jsonify(movement_data)

# Update a movement
@app.route('/movements/<int:movement_id>', methods=['PUT'])
def update_movement(movement_id):
    try:
        movement = Movements.query.get_or_404(movement_id)
        data = request.json
        for key, value in data.items():
            setattr(movement, key, value)
        db.session.commit()
        return jsonify({"message": "Movement updated successfully"})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a movement
@app.route('/movements/<int:movement_id>', methods=['DELETE'])
def delete_movement(movement_id):
    try:
        movement = Movements.query.get_or_404(movement_id)
        db.session.delete(movement)
        db.session.commit()
        return jsonify({"message": "Movement deleted successfully"})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/population', methods=['GET'])
def get_all_population():
    populations = Population.query.all()
    population_list = [
        {"Id": population.Id, "premiseid": population.premiseid, "total_animal": population.total_animal}
        for population in populations
    ]
    return jsonify({"population": population_list})

# Endpoint to get a specific population record by Id
@app.route('/population/<int:population_id>', methods=['GET'])
def get_population_by_id(population_id):
    population = Population.query.get_or_404(population_id)
    population_data = {
        "Id": population.Id,
        "premiseid": population.premiseid,
        "total_animal": population.total_animal
    }
    return jsonify(population_data)


if __name__ == '__main__':
    app.debug=True
    app.run(host='127.0.0.1', port=5000)
    with app.app_context():
        read_csv_and_populate_db()
