from flask import Flask, jsonify, request, redirect, url_for, render_template, flash, session
from uuid import uuid4
from urllib.parse import urlparse
from flask_sqlalchemy import SQLAlchemy
from migrations import read_csv_and_populate_db
import config

app = config.app
db = config.db

@app.route('/', methods=['GET'])
def home():
    return jsonify({"test" : "success"})


if __name__ == '__main__':
    app.debug=True
    app.run(host='127.0.0.1', port=5000)
    with app.app_context():
        read_csv_and_populate_db()
