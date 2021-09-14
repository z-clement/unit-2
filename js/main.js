// function to create the basemap
function createMap() {
    //create the map
    let map = L.map('mapid', {
        center: [40.7128, -74.0060],
        zoom: 10
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

// function to add a popup to each taxi point
function onEachFeature(feature, layer) {
    let popupInfo = "";
    if (feature.properties) {
        // loop through each property & add them to the popup
        for (let property in feature.properties) {
            // give each property a more readable name
            let cleanName;
            if (property === "FIELD1") {
                cleanName = "Order ID";
            } else if (property === "pickup_datetime") {
                cleanName = "Pickup Time";
            } else if (property === "dropoff_datetime") {
                cleanName = "Dropoff Time";
            } else if (property === "passenger_count") {
                cleanName = "Numer of Passengers";
            } else if (property === "trip_duration") {
                cleanName = "Trip Duration (sec)"
            }
            popupInfo += "<p>" + cleanName + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupInfo);
    }
}

// function to get the geoJSON data and put it on the map
function getData(map) {
    $.getJSON("data/pickup_sample.geojson", function(response) {
        // create a leaflet geoJSON layer and put it on the map
        L.geoJson(response, {
            onEachFeature: onEachFeature
        }).addTo(map);
    });
}

$(document).ready(createMap);