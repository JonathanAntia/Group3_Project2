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

    // delete the existing charts and tables
    // d3.selectAll('tbody>tr').remove();

    // consider adding code for the weight of some parameter to be related to actual values
    // example sqft > 2000 sqft or accreage > x amount

    // get the value property of the each input
    const inputBudget = d3.select('#budget').property('value');
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
    if (!(inputBudget == "")){weightCriteriaProvided.budget = inputBudget;}
        else{window.alert('Please select a budget');}
    if (!(inputSalesWeight == "")){weightCriteriaProvided.salesWeight = inputSalesWeight;}
        else{weightCriteriaProvided.salesWeight = 1;} // default value
    if (!(inputCrimeWeight == "")){weightCriteriaProvided.crimeWeight = inputCrimeWeight;}
        else{weightCriteriaProvided.crimeWeight = 1;} // default value
    if (!(inputSchoolWeight == "")){weightCriteriaProvided.schoolWeight = inputSchoolWeight;}
        else{weightCriteriaProvided.schoolWeight = 1;} // default value
    if (!(inputAcreageWeight == "")){weightCriteriaProvided.acreageWeight = inputAcreageWeight;}
        else{weightCriteriaProvided.acreageWeight = 1;} // default value
    if (!(inputSQFTWeight == "")){weightCriteriaProvided.SQFTWeight = inputSQFTWeight;}
        else{weightCriteriaProvided.SQFTWeight = 1;} // default value
    if (!(inputFloodWeight == "")){weightCriteriaProvided.floodWeight = inputFloodWeight;}
        else{weightCriteriaProvided.floodWeight = 1;} // default value
    if (!(inputValueChangeWeight == "")){weightCriteriaProvided.ValueChangeWeight = inputChangeWeight;}
        else{weightCriteriaProvided.ValueChangeWeight = 1;} // default value

    // get a handle on existing data using D3
    d3.json(`api/endpoint/${weightCriteriaProvided}`).then(function(data){
        // add code to create replace existing maps and plots with new ones based on user selection
    });