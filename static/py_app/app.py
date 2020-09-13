import pandas as pandas
import numpy as np
import sqlalchemy
from sqlalchemy import create_engine, func, inspect, join
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify, redirect,
from config import pw
from scores_function import scores

####### INITIATE FLASK APP #########################
app= Flask(__name__)

###### DEFINE HOME ROUTE #################################
@app.route('/api/<weightCriteriaProvided>')
def results(weightCriteriaProvided):
    ##############CALL ON SCORES MODULE FROM processInputs WITH DEFAULT INPUTS######################################
    data = processInputs.scores(weightCriteriaProvided)
    ########## RETURNS AT HOME ROUTE: #####################
    return render_template('results.html', table=[data.to_html(classes='data')], titles=data.columns.values)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/top5neighborhoods/<w_budget>/<w_sales>/<w_crime>/<w_schools>/<w_acreage>/<w_SQ_FT>/<w_flood>/<w_change>')
def data(w_budget, w_sales, w_crime, w_schools, w_acreage, w_SQ_FT, w_flood, w_change):
    data = scores(w_budget, w_sales, w_crime, w_schools, w_acreage, w_SQ_FT, w_flood, w_change)
    return jsonify(data)

@app.route('/apis')
def apis():
    return(
        f'Available api routes: <br>'
        f'json Data: /api/jsonData/weightCriteriaProvided <br> '
        f'Results:  /api/weightCriteriaProvided'
    )
       
        

############# FLASK CLOSING CODE ###################    
if __name__ =='__main__':
    app.run(debug=True)