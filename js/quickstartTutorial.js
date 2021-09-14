// .map creates a new map in the 'mapid' section on the webpage
// .setView sets the center of the map and the zoom level
let mymap = L.map('mapid').setView([51.505, -0.09], 13);

// .tileLayer creates a new tilelayer from the open street map api
// .addTo adds the new tilelayer to the map
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(mymap);

// .marker creates a marker at the given coordinates
let marker = L.marker([51.5, -0.09]).addTo(mymap);

// .circle creates a circle at the given coordinates, with the options given saying how to display it
let circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

// .polygon creates a polygon with verticies at the given coordinates
let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

// .bindPopup creates a popup on the earlier objects
// .openPopup says to open the popup and close all other popups
marker.bindPopup("<strong>Hello world!</strong><br />I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// .popup creates a new popup
// .setLatLng sets where the popup is
// .setContent sets what the popup will say
// .openOn displays the popup on the map
let popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

let popup = L.popup();

// this function creates a new popup at the lat & long that the event happened
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
// this creates an event listener, so the above function is run when the map is clicked on
mymap.on('click', onMapClick);