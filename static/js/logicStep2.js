// Create a map with all recorded earthquakes from the past seven days.
// Add Style to the Earthquake Data
// Add console.log to check to see if our code is working.
console.log("working");

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Create a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        // pointToLayer Function
        pointToLayer: function(feature, latlng) {
        console.log(data);
        // Turn each feature into a circleMarker on the map
        return L.circleMarker(latlng);
        },
        // Set the style for each circleMarker using our styleInfo 
        style: styleInfo
    }).addTo(map);
});

// styleInfo() returns the style data for each of the earthquakes we plot on the map
// Pass the magnitude of the earthquake into a function to calculate the radius
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(),
      stroke: true,
      weight: 0.5
    };
} 
// getRadius() determines the radius of the earthquake marker based on its magnitude
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}

// Create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark layer that will be an option for the map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Day Navigation": streets,
  "Night Navigation": dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers:[streets]
});

// Pass the map layers into the layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);







// // Create a style for the lines.
// let myStyle = {
//   color: "#ffffa1",
//   weight: 2
// }

// // Creating a GeoJSON layer with the retrieved data.
// L.geoJson(data, {
//   style: myStyle,
//   onEachFeature: function(feature, layer) {
//     // layer.bindPopup("<h3>" Airline: ", " + feature.properties.airline+ "</h3> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
//   }
// })
// .addTo(map);






// onEachFeature Function
// Grabbing our GeoJSON data.
// L.geoJson(torontoHoods, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup();
//    }
// }).addTo(map);



// // Add circle marker
// L.circleMarker([34.0522, -118.2437], {
//     radius: 100,
//     color: 'black',
//     fillColor: 'ffffa1',
//  }).addTo(map);

// Get data from cities.js
let cityData = cities;
  console.log(cities);
  // const numberFormatter = Intl.NumberFormat('en-US');

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, { 
//     // orange circle popup marker for each city
//     radius: city.population/200000,
//     weight: 4,
//     fillOpacity: 0.25,
   
//     color: '#ff9933',
//     fillColor: '#ff9933'
//     })
//     .addTo(map)
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });
