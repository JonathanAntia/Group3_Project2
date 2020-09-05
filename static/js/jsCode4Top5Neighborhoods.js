// this code will go inside a function associated with an event listener
// the data will be requested from one of the api endpoints, in json format


d3.json('static/data/data.json').then((data)=>{

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
    let tableData = neighborhood.map((item,i)=>({
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

    console.log(tableData);

    const fullTable = tableData.forEach(neighborhood => {
        let row = tbody.append('tr');
        Object.values(neighborhood).forEach(info => {
            let cell = row.append('td');
            cell.text(info);
        })
        
    });

    // add a map showing average score for houston's top 5 neighborhoods
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
    
    // // Store API query variables
    // const baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
    // const date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
    // const complaint = "&complaint_type=Rodent";
    // const limit = "&$limit=10000";
    
    // // Assemble API query URL
    // const url = baseURL + date + complaint + limit;
    
    // // Grab the data with d3
    // d3.json(url).then( function(response) {
    
        // Create a new marker cluster group
        const markers = L.markerClusterGroup();
    
        // Loop through data
        response.forEach(response => {
    
        // Check for location property
        if (response.location) {
    
            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([response.location.coordinates[1], response.location.coordinates[0]])
            .bindPopup(response.descriptor));
        }
    
        });
    
        // Add our marker cluster layer to the map
        myMap1.addLayer(markers);
    
    });  
// });