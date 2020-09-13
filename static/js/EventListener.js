// TODO:
// 1. write a cript to load the map in the home page
// 2. create a script that will take input from the main page for the top 5 neighborhoods
//      2.1 within that script have a function that will load the maps with layers
//          and load the first version of the bar chart
//      2.2 then write a event handler to change the bar charts based on user input
//      2.3 write a function to associate with the event handler and change the bar charts
// 3. create a script that will handle a click on all neighborhood
//      3.1 within that script have a function that will load the maps with layers
//          and load the first version of the bar chart
//      3.2 then write a event handler to change the bar charts based on user input
//      3.3 write a function to associate with the event handler and change the bar charts

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
        else{weightCriteriaProvided.salesWeight = 0;} // default value
    if (!(inputCrimeWeight == "")){weightCriteriaProvided.crimeWeight = inputCrimeWeight;}
        else{weightCriteriaProvided.crimeWeight = 0;} // default value
    if (!(inputSchoolWeight == "")){weightCriteriaProvided.schoolWeight = inputSchoolWeight;}
        else{weightCriteriaProvided.schoolWeight = 0;} // default value
    if (!(inputAcreageWeight == "")){weightCriteriaProvided.acreageWeight = inputAcreageWeight;}
        else{weightCriteriaProvided.acreageWeight = 0;} // default value
    if (!(inputSQFTWeight == "")){weightCriteriaProvided.SQFTWeight = inputSQFTWeight;}
        else{weightCriteriaProvided.SQFTWeight = 0;} // default value
    if (!(inputFloodWeight == "")){weightCriteriaProvided.floodWeight = inputFloodWeight;}
        else{weightCriteriaProvided.floodWeight = 0;} // default value
    if (!(inputValueChangeWeight == "")){weightCriteriaProvided.ValueChangeWeight = inputChangeWeight;}
        else{weightCriteriaProvided.ValueChangeWeight = 0;} // default value

    // get a handle on existing data using D3
    // d3.json(`/api/hou_real_estate/${weightCriteriaProvided}`).then(function(data){
    d3.json('static/data/data.json').then(function(data){
        // add code to create replace existing maps and plots with new ones based on user selection
        console.log(data);
    });
        // TODO:
        // Generate a map with layers to show the parameters for the top 5 neighborhoods
        //      This map will have markers per neighborhood with tooltips per parameter
        // Generate a horizontal bar chart with top 5 neighborhood scores
        // Generate an interactive bar chart showing each parameter per neighborhood
        // Figure out the geo interactive map
        // Add data table with the data results

        // use d3 to select the table body
        const tbody = d3.select('tbody');

        const fullTable = data.forEach(neighborhood => {
        let row = tbody.append('tr');
        Object.values(neighborhood).forEach(info => {
            let cell = row.append('td');
            cell.text(info);
        })
        
    })
// });