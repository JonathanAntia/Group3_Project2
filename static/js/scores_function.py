def scores (w_sales, w_crime, w_schools, w_acreage, w_sqft, w_flood, w_change, df):
# Calculate scores for each address.
total_weights=w_sales+w_crime+w_schools+w_acreage+w_SQ_FT+w_flood+w_change

df["Sales Index_W"]=w_sales*df['Sales Index']
df['Crime Index_W']= w_crime*df['Crime Index']
df["School Rating Index_W"]=w_schools*df['School Rating Index']
df["Acreage Index_W"]= w_acreage*df['Acreage Index']
df["SQ_FT_Index_W"]= w_SQ_FT*df['SQ_FT Index']
df["Flood Risk Index_W"]=w_flood*df['Flood Risk Index']
df['Valuation Index_W']= w_change*df['Valuation Index']

df["Score"]=round((w_sales*df['Sales Index']-
                                   w_crime*df['Crime Index']+
                                   w_schools*df['School Rating Index']+
                                   w_acreage*df['Acreage Index']+
                                   w_SQ_FT*df['SQ_FT Index']-
                                   w_flood*df['Flood Risk Index']+
                                   w_change*df['Valuation Index'])/total_weights,2)
max=homes_less_than_1M["Score"].max()
min=homes_less_than_1M["Score"].min()
max=homes_less_than_1M["Score"]=(homes_less_than_1M["Score"]-min)/(max-min)*100

# group parameters by neighborhood name
neighborhood_group = parameter_and_score.groupby(["NEIGHBORHOOD"]).mean()

# To get to the top list, neighnorhoods need positive valuation index and non-zero sales index
neighborhood_group=neighborhood_group.loc[(neighborhood_group['Valuation Index']>0)&(neighborhood_group['Sales Index']>0),:]

min=neighborhood_group['Valuation Index'].min()
max=neighborhood_group['Valuation Index'].max()
min=neighborhood_group['Valuation Index']=(neighborhood_group['Valuation Index']-min)/(max-min)*100

# sort scores
rank_all = neighborhood_group.sort_values('Score',ascending=False)

return rank_all.head()