// Add console.log to check to see if our code is working.
console.log("working");

// Create a map with all recorded earthquakes from the past seven days.
// Add Style to the Earthquake Data
// Add Color and a Popup for Each Earthquake

// streets/day tilelayer that will be the background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// // dark tilelayer that will be an option for the map
// let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
    // id: "mapbox/dark-v10",
    // tileSize: 512,
    // zoomOffset: -1,
//     accessToken: API_KEY
// });

// sateliteSteets tilelayer that will be an option for the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/satellite-streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// // Create a base layer that holds both maps.
// let baseMaps = {
//   "Day Navigation": streets,
//   "Night Navigation": dark
// };

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};


// Create the earthquake layer for the map.
let earthquakes = new L.layerGroup();

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers:[streets]
  });
  
// Define the object that contains the overlays
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };

  // // Pass the map layers into the layers control and add the layers control to the map
  // L.control.layers(baseMaps).addTo(map);
  
  // Add a control to the map that will allow the user to change which layers are visible.
  L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    
    // styleInfo() returns the style data for each of the earthquakes we plot on the map
    // Pass the magnitude of the earthquake into a function to calculate the radius
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            // fill-color range for the magnitude
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            // Change the color of each earthquake marker based on the magnitude
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    } 

    // getColor() determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
        return "#ea2c2c";
        }
        if (magnitude > 4) {
        return "#ea822c";
        }
        if (magnitude > 3) {
        return "#ee9c00";
        }
        if (magnitude > 2) {
        return "#eecc00";
        }
        if (magnitude > 1) {
        return "#d4ee00";
        }
        return "#98ee00";
    }

    // getRadius() determines the radius of the earthquake marker based on its magnitude
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 4;
    }


// Create a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        // pointToLayer Function
        pointToLayer: function(feature, latlng) {
            console.log(data);
            // Turn each feature into a circleMarker on the map
            return L.circleMarker(latlng);
        },
        // Set the style for each circleMarker using our styleInfo 
        style: styleInfo,
            // Create a popup for each circleMarker to display magnitude and location of the earthquake after the marker has been created and styled.
            onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    // Add earthquake layer to the map
    earthquakes.addTo(map);
});



// onEachFeature Function
// Grabbing our GeoJSON data.
// L.geoJson(torontoHoods, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup();
//    }
// }).addTo(map);

// // Get data from cities.js
// let cityData = cities;
//   console.log(cities);
//   // const numberFormatter = Intl.NumberFormat('en-US');