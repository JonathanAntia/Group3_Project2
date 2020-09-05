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
    // define x and y
    const coordinates = data.map(item => [item.TotalScore, item.Neighborhood]);
    const sorted = coordinates.sort((a,z)=> a[0]- z[0]);
    const x = sorted.map(item => item[0]);
    const y = sorted.map(item => item[1]);

    console.log(x);
    console.log(y);

    // create a trace object with x as the score and y as the neighborhood name
    const trace = {
        type: 'bar',
        x: x,
        y: y,
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
            rangemode: 'tozero'
        }
    }
    Plotly.newPlot('hbarPlotTopScores', [trace], layout);
});  