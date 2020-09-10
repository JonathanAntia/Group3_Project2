# load dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect,join
import numpy as np
import pandas as pd
from flask import (Flask, render_template, jsonify, request, redirect)
from flask_sqlalchemy import SQLAlchemy
from processInputs import scores
from userInputs import default_inputs

app= Flask(__name__)

scores(default_inputs)

@app.route("/jsondata")
def jsondata():

   return top5hoods.json


@app.route('/')
def hello():
    return top5hoods.json


if __name__ =='__main__':
    app.run(debug=True)