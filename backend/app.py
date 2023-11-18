from flask import Flask, jsonify, request, redirect, url_for, render_template, flash, session
from uuid import uuid4
from urllib.parse import urlparse
from flask_sqlalchemy import SQLAlchemy
from migrations import read_csv_and_populate_db
from sqlalchemy.exc import SQLAlchemyError
import config
from models import Movements, Population, User
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
import logging

app = config.app
db = config.db
app.logger.setLevel(logging.DEBUG)

CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

jwt = JWTManager(app)



@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username).first()    
    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid password'}), 401

@app.route('/signUp', methods=['POST'])
def createUser():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    # Check if the username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@app.route('/', methods=['GET'])
def home():
    return jsonify({"test" : "success"})


# Create a movement
@app.route('/movements', methods=['POST'])
def create_movement():
    try:
        data = request.json
        data["new_shipmentsstartdate"] = datetime.datetime.strptime(data["new_shipmentsstartdate"], "%y-%m-%d").date()
        new_movement = Movements(**data)
        db.session.add(new_movement)
        db.session.commit()
        return jsonify({"message": "Movement created successfully"})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        app.logger.error(e)

# Get all movements
@app.route('/movements', methods=['GET'])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
def get_all_population():
    #populations = Population.query.all()
    population_data = db.session.query(Population, Movements).join(Movements, (Movements.new_originpremid == Population.premiseid) | (Movements.new_destinationpremid == Population.premiseid)).distinct().all()
#     result = db.session.query(
#     Population.Id.label('population_id'),
#     Population.premiseid,
#     Movements.Id.label('movement_id'),
#     Movements.origin_Lat,
#     Movements.origin_Lon,
#     Movements.destination_Lat,
#     Movements.destination_Long
# ).outerjoin(
#     Movements,
#     (Movements.new_originpremid == Population.premiseid) | (Movements.new_destinationpremid == Population.premiseid)
# ).distinct().all()
    result = []
    for pop, move in population_data:
        result.append({
            "Id": pop.Id,
            'premiseid': pop.premiseid,
            'total_animal': pop.total_animal,
            'lat': move.origin_Lat,
            'long': move.origin_Lon
        })

    # Return the data as JSON to the client
    return jsonify({"population": result})

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

@app.route('/population', methods=['POST'])
def create_population():
    try:
        data = request.json
        new_population = Population(**data)
        db.session.add(new_population)
        db.session.commit()
        return jsonify({"message": "Population created successfully"})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        app.logger.error(e)

if __name__ == '__main__':
    app.debug=True
    with app.app_context():
        read_csv_and_populate_db()
    app.run(host='0.0.0.0', port=3001)
