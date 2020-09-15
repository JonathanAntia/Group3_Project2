def SQL_Pull(budget):
    results_df=pd.read_csv('data/results.csv')
    results_df=results_df.loc[results_df['total_appraised_value_2019']<=budget,:]
    return (results_df)