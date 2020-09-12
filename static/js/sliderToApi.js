//PULL VALUES FROM SLIDERS:
/////////////////////////////////////////////////
const budgetSlider = document.getElementById("budget");
budget=budgetSlider.value;

const salesSlider = document.getElementById("salesWeight");
salesWeight=salesSlider.value;

const schoolslider = document.getElementById("schoolWeight");
schoolWeight=schoolSlider.value;

const crimeSlider = document.getElementById("crimeWeight");
crimeWeight=crimeSlider.value;

const acreageSlider = document.getElementById("acreageWeight");
acreageWeight=acreageSlider.value;

const sqftSlider = document.getElementById("sqftWeight");
sqftWeight=sqftSlider.value;

const floodSlider = document.getElementById("floodWeight");
floodWeight=cfloodSlider.value;

const valueSlider = document.getElementById("valueWeight");
valueWeight=valueSlider.value;





//////////////////////////////////////////////////////////////////
function top5NeighborhoodsContent(budget, ){
    const api_url= "/api/jsonData/"
    url='/api/jsonData/budget<budget>
    // console.log(url)
    d3.json(`${api_url}${weightCriteriaProvided}`).then((response)=>{
        const data = response;
        console.log(data);
    })
}