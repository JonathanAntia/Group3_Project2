# load dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect,join
import numpy as np
import pandas as pd
from flask import (Flask, render_template, jsonify, request, redirect)
from flask_sqlalchemy import SQLAlchemy
import processInputs 
from userInputs import default_inputs

app= Flask(__name__)



# @app.route("/jsondata")
# def jsondata():

#    return jsonify(top5hoods)


@app.route('/',  methods = ("POST", "GET"))
def home():
 return render_template('index.html', )

if __name__ =='__main__':
    app.run(debug=True)