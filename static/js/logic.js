// Add console.log to check to see if our code is working.
console.log("working");

// // // Create the map object with a center and zoom level.
// // let map = L.map("mapid", {
// //   center: [
// //     40.7, -94.5
// //   ],
// //   zoom: 4
// // });

// // Add circle marker
// L.circleMarker([34.0522, -118.2437], {
//     radius: 100,
//     color: 'black',
//     fillColor: 'ffffa1',
//  }).addTo(map);

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.243], 14);

// Add circle marker
L.circleMarker([34.0522, -118.2437], {
    radius: 100,
    color: 'black',
    fillColor: 'ffffa1',
 }).addTo(map);

// // //  Add a marker to the map for Los Angeles, California.
// let map = L.map('mapid').setView([34.0522, -118.243], 14);

// //  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Get data from cities.js
let cityData = cities;
console.log(cities);
const numberFormatter = Intl.NumberFormat('en-US');

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, { 
    // orange circle popup marker for each city
    radius: city.population/200000,
    weight: 4,
    fillOpacity: 0.25,
   
    color: '#ff9933',
    fillColor: '#ff9933'
    })
    .addTo(map)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

