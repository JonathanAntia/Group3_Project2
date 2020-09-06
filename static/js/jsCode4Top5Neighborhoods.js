// this code will go inside a function associated with an event listener
// the data will be requested from one of the api endpoints, in json format


d3.json('static/data/data.json').then((data)=>{
    console.log('All Data:')
    console.log(data);

    // extract the data needed for the table
    const neighborhood = data.map(entry=> entry.Neighborhood);
    const sales = data.map(entry=> entry.SalesIndex);
    const crime = data.map(entry=> entry.CrimeIndex);
    const school = data.map(entry=> entry.SchoolRating);
    const acreage = data.map(entry=> entry.AcreageIndex);
    const sqft = data.map(entry=> entry.SQFTIndex);
    const flood = data.map(entry=> entry.FloodIndex);
    const valuation = data.map(entry=> entry.ValueChangeIndex);

    // create an object with table data
    const tableData = neighborhood.map((item,i)=>({
        neighborhood: item, 
        sales: sales[i],
        crime: crime[i],
        school: school[i],
        acreage: acreage[i],
        sqft: sqft[i],
        flood: flood[i],
        valuation: valuation[i]
    }));

    // use d3 to select the table body
    const tbody = d3.select('tbody');

    console.log('Neighborhood Data:')
    console.log(tableData);

    // add data to the table
    const fullTable = tableData.forEach(neighborhood => {
        let row = tbody.append('tr');
        Object.values(neighborhood).forEach(info => {
            let cell = row.append('td');
            cell.text(info);
        })
        
    });

    // add a map showing houston's top 5 neighborhoods
    // Creating map object
    const myMap1 = L.map("map_hou_top_5", {
        center: [29.76, -95.37],
        zoom: 11
    });
    
    // Adding tile layer to the map
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap1);
    
    // add marker to each neighborhood and popup with info
    data.forEach(item => {
        L.marker([item.Latitude, item.Longitude])
        .bindPopup("<h1>"+item.Neighborhood+"</h1>")
        .addTo(myMap1);
    })
  
    // create a horizontal bar chart with average score per neighborhood
    const coordinates = data.map(item => [item.TotalScore, item.Neighborhood]);
    const sorted = coordinates.sort((a,z)=> a[0]- z[0]);

    // create a trace object with x as the score and y as the neighborhood name
    const NeighborhoodTrace = {
        type: 'bar',
        x: sorted.map(item => item[0]),
        y: sorted.map(item => item[1]),
        orientation: 'h'
    }
    // define layout
    const layout = {
        title: "Top 5 Neighborhoods",
        yaxis: {
            automargin: true,
            rangemode: 'tozero'
        },
        xaxis: {
            rangemode: 'tozero',
            title: 'Total Score'
        }
    }
    Plotly.newPlot('hbarPlotTopScores', [NeighborhoodTrace], layout);

    // create a bar chart to show each parameter per neighborhood
    // filter tableData with Neighborhood selected by user
    const userSelection = 'SchoolRating'
    
    function chooseParameter (parameter){
        switch(parameter){
            case "SaleIndex":
                return data.map(item => item.SaleIndex);
            case "CrimeIndex":
                return data.map(item => item.CimeIndex);
            case "SchoolRating":
                return data.map(item => item.SchoolRating);
            case "AcreageIndex":
                return data.map(item => item.AcreageIndex);
            case "SQFTIndex":
                return data.map(item => item.SQFTIndex);
            case "FloodIndex":
                return data.map(item => item.FloodIndex);
            default:
                return data.map(item => item.ValueChangeIndex);
        }
    };

    // create a trace object with x as the neighborhood and y as the userSelected parameter
    const x = data.map(item => item.Neighborhood);
    let y = chooseParameter(userSelection);

    const ParameterTrace = {
        type: 'bar',
        x: data.map(item => item.Neighborhood),
        y: chooseParameter(userSelection)
    }
    // define layout
    const parameterLayout = {
        title: "Top 5 Neighborhoods",
        yaxis: {
            automargin: true,
            rangemode: 'tozero',
            title: userSelection
        },
        xaxis: {
            rangemode: 'tozero'
        }
    }
    Plotly.newPlot('barPlotParameter', [ParameterTrace], parameterLayout);
});  