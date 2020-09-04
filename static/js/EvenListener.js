// STEPS:
// get a handle on the result object from Adriana's API end-point
// get a handle on user input
// use user input to calculate scores
// return the data for the top 5 neighborhoods

// create a tbody variable to get a handle on the html element
const tbody = d3.select('tbody');

// select the button
const button = d3.select('#filter-btn');

// create an event handler for clicking the button or pressing the enter key
button.on('click', runEnter);

window.addEventListener('keyup', function (event){
    if (event.defaultPrevented){
        return;
    }
    if (event.keyCode === 13){
        runEnter();
    }
})


/// create a function to run for both events
function runEnter () {

    // delete the existing table data rows
    // d3.selectAll('tbody>tr').remove();

    // consider adding code for the weight of some parameter to be related to actual values
    // example sqft > 2000 sqft or accreage > x amount

    // get the value property of the each input
    const inputSalesWeight = d3.select('#salesWeight').property('value');
    const inputCrimeWeight = (d3.select('#crimeWeight').property('value'));
    const inputSchoolWeight = (d3.select('#schoolWeight').property('value'));
    const inputAcreageWeight = (d3.select('#accreageWeight').property('value'));
    const inputSQFTWeight = (d3.select('#sqftWeight').property('value'));
    const inputFloodWeight = (d3.select('#floodWeight').property('value'));
    const inputValueChangeWeight = (d3.select('#changeValueWeight').property('value'));

    // create an empty object to hold the user input
    let weightCriteriaProvided = {};

    // check if input criteria was provided and add to weightCriteria object
    if (!(inputSalesWeight == "")){weightCriteriaProvided.salesWeight = inputSalesWeight;}
        // else{weightCriteriaProvided.salesWeight = 0;}
    if (!(inputCrimeWeight == "")){weightCriteriaProvided.crimeWeight = inputCrimeWeight;}
        // else{weightCriteriaProvided.crimeWeight = 0;}
    if (!(inputSchoolWeight == "")){weightCriteriaProvided.schoolWeight = inputSchoolWeight;}
        // else{weightCriteriaProvided.schoolWeight = 0;}
    if (!(inputAcreageWeight == "")){weightCriteriaProvided.acreageWeight = inputAcreageWeight;}
        // else{weightCriteriaProvided.acreageWeight = 0;}
    if (!(inputSQFTWeight == "")){weightCriteriaProvided.SQFTWeight = inputSQFTWeight;}
        // else{weightCriteriaProvided.SQFTWeight = 0;}
    if (!(inputFloodWeight == "")){weightCriteriaProvided.floodWeight = inputFloodWeight;}
        // else{weightCriteriaProvided.floodWeight = 0;}
    if (!(inputValueChangeWeight == "")){weightCriteriaProvided.ValueChangeWeight = inputChangeWeight;}
        // else{weightCriteriaProvided.ValueChangeWeight = 0;}

    // create arrays for keys and values of filter criteria provided
    const keys = Object.keys(filterCriteriaProvided);
    const values = Object.values(filterCriteriaProvided);
    
    // calculate total weight?
    const sum = values.reduce(function(a, b){
        return a + b;
        }, 0);

    // get a handle on existing data using D3
    d3.json(`api/endpoint/${weightCriteriaProvided}`).then(function(data){
        // grab the data for each parameter and assign to a variable
        const sales = data.Sales_Index;
        const crime = data.Crime_Index;
        const school = data.School_Rating_Index;
        const acreage = data.Acreage_Index;
        const sqft = data.SQ_FT_Index;
        const flood = data.Flood_Risk_Index;
        const changeValue = data.Valuation_Index;

        // apply calculations to exisiting data
        sales.forEach(sale => sale*values[0]);
        crime.forEach(crime => crime*values[1]);
        school.forEach(school => school*values[2]);
        acreage.forEach(lot => lot*values[3]);
        sqft.forEach(size => size*values[4]);
        flood.forEach(location => location*values[5]);
        changeValue.forEach(appraisal => appraisal*values[6]);

        // calculate total score per residence
        let scores = [];

        for(let i = 0; i < sales.length; i++){
            const score = (sales[i]-crime[i]+school[i]+acreage[i]+sqft[i]-flood[i]+changeValue[i])/sum;
            scores.push(score);
        };

        // normalize the scores
        // max=homes_less_than_1M["Score"].max()
        // min=homes_less_than_1M["Score"].min()
        // max=homes_less_than_1M["Score"]=(homes_less_than_1M["Score"]-min)/(max-min)*100

        // add the scores to the data object
        for (let x = 0; x < scores.length; i++){
            data[i].score = scores[i]
        };

        // group data by neighborhood
        let group = data.reduce((r, a) => {
            r[a.neighborhood] = [...r[a.neighborhood] || [], a];
            return r;
           }, {});
           console.log("group", group);

        // calculate the average score of each neighborhood

        // sort the data based on average score per neighborhood
        const sortedData = data.sort((a,z)=> a.score - z.score);

        // return the data for the top five neighborhoods
    });