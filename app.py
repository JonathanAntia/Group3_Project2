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
import json

app= Flask(__name__)



@app.route("/jsondata")
def jsondata():

   return jsonify(top5hoods)


@app.route('/',  methods = ("POST", "GET"))
def html_table():
    scores(default_inputs)
    json= "top5hoods.json"
   return(json)


if __name__ =='__main__':
    app.run(debug=True)