# load dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect,join
import numpy as np
import pandas as pd
from flask import (Flask, render_template, jsonify, request, redirect)
from flask_sqlalchemy import SQLAlchemy
import json
# from user_inputs import default_inputs
import pull
from scores_function import scores
from werkzeug.http import HTTP_STATUS_CODES


####### INITIATE FLASK APP #########################
app= Flask(__name__)

###### DEFINE HOME ROUTE #################################

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/jsonData/<budget>/<salesWeight>/<crimeWeight>/<schoolWeight>/<acreageWeight>/<sqftWeight>/<floodWeight>/<valueChangeWeight>')
def results(budget, salesWeight, crimeWeight, schoolWeight, acreageWeight, sqftWeight, floodWeight, valueChangeWeight):

    dictionaryOfUserInput={}
    dictionaryOfUserInput["budget"]=float(budget)
    dictionaryOfUserInput["salesWeight"]=int(salesWeight)
    dictionaryOfUserInput["crimeWeight"]=int(crimeWeight)
    dictionaryOfUserInput["schoolWeight"]=int(schoolWeight)
    dictionaryOfUserInput["acreageWeight"]=int(acreageWeight)
    dictionaryOfUserInput["sqftWeight"]=int(sqftWeight)
    dictionaryOfUserInput["floodWeight"]=int(floodWeight)
    dictionaryOfUserInput["changeValueWeight"]=int(valueChangeWeight)


    df = scores(dictionaryOfUserInput)
    
    return df.to_json()


# @app.route('/api/results/<budget>/<salesWeight>/<crimeWeight>/<schoolWeight>/<acreageWeight>/<sqftWeight>/<floodWeight>/<valueChangeWeight>'')
# def results():
#     dictionaryOfUserInput={}
#     dictionaryOfUserInput["budget"]=float(budget)
#     dictionaryOfUserInput["salesWeight"]=int(salesWeight)
#     dictionaryOfUserInput["crimeWeight"]=int(crimeWeight)
#     dictionaryOfUserInput["schoolWeight"]=int(schoolWeight)
#     dictionaryOfUserInput["acreageWeight"]=int(acreageWeight)
#     dictionaryOfUserInput["sqftWeight"]=int(sqftWeight)
#     dictionaryOfUserInput["floodWeight"]=int(floodWeight)
#     dictionaryOfUserInput["changeValueWeight"]=int(valueChangeWeight)


#     df = processInputs.scores(dictionaryOfUserInput)

#     return df
#     # render_template('index.html',  tables=[df.to_html(classes='data')], titles=df.columns.values)

# @app.route('/api/jsonData/<budget>')
# def data(budget):

#     budget=float(budget)
#     data = pull.SQL_Pull(budget)
#     return data.to_json()



# @app.route('/apis')
# def apis():
#     return(
#         f'Available api routes: <br>'
#         f'json Data: /api/jsonData/?q/budget/salesWeight/crimeWeight/schoolWeight/acreageWeight/sqftweight/floodWeight/valueChangeWeight<br> '
#         f'Results:  /api/budget/salesWeight/crimeWeight/schoolWeight/acreageWeight/sqftweight/floodWeight/valueChangeWeight
#     )

# @app.route("/test", methods=["POST"])
# def test():
   
#     return budget

##########  ERROR HANDLING ##################
def error_response(status_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response
     

############# FLASK CLOSING CODE ###################    
if __name__ =='__main__':
    app.run(debug=True)