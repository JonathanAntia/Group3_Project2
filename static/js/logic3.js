
// Adding tile layer
const dark= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
    });

const light= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
    });

const streets= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
    });

const baseMaps = {
  Light: light,
  Dark: dark,
  Streets: streets
  };


// Use this link to get the geojson data.
const highSchoolLink = "static/data/HighAttendanceZones1920.geojson";
const midSchoolLink="static/data/MiddleAttendanceZones1920.geojson";
const elemSchoolLink="static/data/ElementaryAttendanceZones1920.geojson";
const link = "static/data/ZIPCODE.geojson";

d3.json(link).then( function(data) {
  console.log(data.features);

 const zipcodes= L.geoJson(data.features, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.ZIPCODE),
        fillOpacity: chooseOpacity(feature.properties.ZIPCODE),
        weight: 1.5
      };
    }, onEachFeature: function(feature, layer) {
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
        // click: function(event) {
        //   myMap.fitBounds(event.target.getBounds());
        // }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h3>" + feature.properties.PO_NAME + "</h3> <hr> <h4>" + feature.properties.ZIPCODE + "</h4>");

    }
  });



d3.json(highSchoolLink).then(function(response){
  const highSchools = L.geoJSON(response,{  
      style: function(feature){
          return{
              color: 'white',
              fillColor: "red",
              fillOpacity: 0.5,
              weight: 1.5,
          }
      },      
      onEachFeature: function(feature,layer){
      layer.bindPopup("<h3>High School </h3><hr>" + feature.properties.High_Schoo , {maxWidth: 400});
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
      });
    }
  })


    d3.json(midSchoolLink).then(function(response){
      const middleSchools = L.geoJSON(response,{  
          style: function(feature){
              return{
                color: 'white',
                fillColor: "blue",
                fillOpacity: 0.5,
                weight: 1.5,
              }
          },      
          onEachFeature: function(feature,layer){
          layer.bindPopup("<h3>Middle School </h3><hr>" + feature.properties.Middle_Sch , {maxWidth: 400});
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
          });
        }
      })
  
      d3.json(elemSchoolLink).then(function(response){
        const elemSchools = L.geoJSON(response,{  
            style: function(feature){
                return{
                  color: 'white',
                  fillColor: "green",
                  fillOpacity: 0.5,
                  weight: 1.5,
                }
            },      
            onEachFeature: function(feature,layer){
            layer.bindPopup("<h3>Elementary School </h3><hr>" + feature.properties.Elementary , {maxWidth: 400});
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
            });
            }
        })


  const overlayMaps = {
    "Zip Codes": zipcodes,
    "High Schools" : highSchools,
    "Middle Schools": middleSchools,
    "Elementary Schools": elemSchools
    };
  
 
  // Creating map object for Houston School Map
  const myMap = L.map("map", {
    center: [29.74, -95.367497],
    zoom: 11,
    layers: [streets,zipcodes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
  

})
})
})
})

function chooseColor(zipcode) {
  switch (zipcode) {
  case 77002:
    return "yellow";
  case 77005:
    return "red";
  case 77006:
    return "orange";
  case 77019:
    return "green";
  case 77025:
    return "purple";
  case 77030:
    return "blue";
  case 77054:
    return "darkblue";
  case 77027:
    return "purple";
  case 77098:
    return "yellow";
  default:
    return "white";
  }
}

function chooseOpacity(zipcode) {
  switch (zipcode) {
  case 77002:
    return 0.5;
  case 77005:
    return 0.5;
  case 77006:
    return 0.5;
  case 77019:
    return 0.5;
  case 77025:
    return 0.5;
  case 77030:
    return 0.5;
  case 77054:
    return 0.5;
  case 77027:
    return 0.5;
  case 77098:
    return 0.5;
  default:
    return 0.2;
  }
}
