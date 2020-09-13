
// Creating map object
const myMap = L.map("map", {
  center: [29.807284, -95.367497],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
const link = "static/data/ElementaryAttendanceZones1920.geojson";


// // Our style object
// const mapStyle = {
//   color: "white",
//   fillColor: "pink",
//   fillOpacity: 0.5,
//   weight: 1.5
// };

// Function that will determine the color of the ZIP Code based on the ZIPCODE it belongs to
// function chooseColor(code) {
//   switch (code) {
//   case 001:
//     return "yellow";
//   case 002:
//     return "red";
//   case 003:
//     return "orange";
//   case 004:
//     return "green";
//   case 005:
//     return "purple";
//   case 006:
//     return "blue";
//   case 007:
//     return "darkblue";
//   case 008:
//     return "purple";
//   case 009:
//     return "yellow";
//   default:
//     return "grey";
//   }
// }

// Grabbing our GeoJSON data..
d3.json(link).then( function(data) {
  // Creating a GeoJSON layer with the retrieved data
  console.log(data.features);

  L.geoJson(data.features, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: 'orange',
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
  
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.High_Schoo + "</h1> ");

    }
  }).addTo(myMap);
});

