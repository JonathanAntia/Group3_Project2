import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
from SQL_Pull import SQL_Pull
from config_sql import pw

url = f'postgresql://postgres:{pw}@localhost:5432/Houston_Real_Estate_db'

#################################################
# Database Setup
#################################################
#Connect to PostgreSQL
#Create the engine
engine = create_engine(url)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
session=Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


# define a home route to render html webpage
@app.route("/")
def home ():
    return render_template('index.html')

# define what to do when the user hits the first route
@app.route("/api/hou_real_estate/<dictionaryOfUserInput>")
def scores (dictionaryOfUserInput):
    budget = dictionaryOfUserInput[budget]
    w_sales = dictionaryOfUserInput[sales]
    w_crime = dictionaryOfUserInput[crime]
    w_schools = dictionaryOfUserInput[schools]
    w_acreage = dictionaryOfUserInput[acreage]
    w_SQ_FT = dictionaryOfUserInput[sqft]
    w_flood = dictionaryOfUserInput[Flood]
    w_change = dictionaryOfUserInput[change]

    # call SQL_Pull function to query the database and create a dataframe
    df = SQL_Pull(budget)

    # Normalize data for each parameter
    max=df['Offense_Count'].max()
    min=df['Offense_Count'].min()
    df["Crime Index"]=(df['Offense_Count']-min)/(max-min)*100

    max=df['school_rating'].max()
    min=df['school_rating'].min()
    df["School Rating Index"]=(df['school_rating']-min)/(max-min)*100

    max=df['acreage'].max()
    min=df['acreage'].min()
    df["Acreage Index"]=(df['acreage']-min)/(max-min)*100

    max=df['sq_ft'].max()
    min=df['sq_ft'].min()
    df["SQ_FT Index"]=(df['sq_ft']-min)/(max-min)*100

    max=df['flood_risk'].max()
    min=df['flood_risk'].min()
    df["Flood Risk Index"]=(df['flood_risk']-min)/(max-min)*100


    max=df['pct_value_change'].max()
    df['Valuation Index']=df['pct_value_change']/max*100

    # Calculate scores for each address.
    total_weights=w_sales+w_crime+w_schools+w_acreage+w_SQ_FT+w_flood+w_change

    # Add calculated scores to the dataframe
    df["Sales Index_W"]=w_sales*df['Sales Index']
    df['Crime Index_W']= w_crime*df['Crime Index']
    df["School Rating Index_W"]=w_schools*df['School Rating Index']
    df["Acreage Index_W"]= w_acreage*df['Acreage Index']
    df["SQ_FT_Index_W"]= w_SQ_FT*df['SQ_FT Index']
    df["Flood Risk Index_W"]=w_flood*df['Flood Risk Index']
    df['Valuation Index_W']= w_change*df['Valuation Index']

    # Calculate total score per row
    df["Score"]=round((w_sales*df['Sales Index']-
                        w_crime*df['Crime Index']+
                        w_schools*df['School Rating Index']+
                        w_acreage*df['Acreage Index']+
                        w_SQ_FT*df['SQ_FT Index']-
                        w_flood*df['Flood Risk Index']+
                        w_change*df['Valuation Index'])/total_weights,2)

    # convert the score to percentage and scale them
    max=df["Score"].max()
    min=df["Score"].min()
    max=df["Score"]=(df["Score"]-min)/(max-min)*100

    # look at only the parameters of interest
    parameter_and_score = df[["Sales Index",'Crime Index', 'School Rating Index',
            'Acreage Index','SQ_FT Index', 'Flood Risk Index', 'Valuation Index','Score',
            'TOTAL_APPRAISED_VALUE_2019','NEIGHBORHOOD']]

    # group parameters by neighborhood name
    neighborhood_group = parameter_and_score.groupby(["NEIGHBORHOOD"]).mean()

    # To get to the top list, neighnorhoods need positive valuation index and non-zero sales index
    neighborhood_group=neighborhood_group.loc[(neighborhood_group['Valuation Index']>0)&(neighborhood_group['Sales Index']>0),:]

    min=neighborhood_group['Valuation Index'].min()
    max=neighborhood_group['Valuation Index'].max()
    min=neighborhood_group['Valuation Index']=(neighborhood_group['Valuation Index']-min)/(max-min)*100

    # sort scores
    ranked_neighborhoods = neighborhood_group.sort_values('Score',ascending=False)

    return jsonify(ranked_neighborhoods.head())

if __name__ == '__main__':
    app.run(debug=True)