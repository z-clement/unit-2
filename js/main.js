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
        // add another line that converts trip duration to minutes, rounded to the nearest integer
        let min = Math.round(feature.properties["trip_duration"] / 60);
        popupInfo += "<p>Trip Duration (min): " + min + "</p>";
        layer.bindPopup(popupInfo);
    }
}

// function to turn the markers to circle markers
function pointtoCircle(feature, latlng) {
    let fillColor;
    // make the fill color variable depending on the ride duration
    if (feature.properties["trip_duration"] < (5 * 60)) {
        fillColor = "#a1fc03";
    } else if (feature.properties["trip_duration"] < (10 * 60)) {
        fillColor = "#f5da42";
    } else if (feature.properties["trip_duration"] < (15 * 60)) {
        fillColor = "#f5b342";
    } else if (feature.properties["trip_duration"] < (20 * 60)) {
        fillColor = "#f58a42";
    } else {
        fillColor = "#f55142";
    }

    // define the options for making the circles on the map
    let circleOptions = {
        radius: 5,
        fillColor: fillColor,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    return L.circleMarker(latlng, circleOptions);
}

// function to filter the taxi rides so that we only see ones with over 3 people
function filterLargeRides(feature) {
    if (feature.properties["passenger_count"] > 3) {
        return true;
    } else {
        return false;
    }
}

// function to get the geoJSON data and put it on the map
function getData(map) {
    $.getJSON("data/pickup_sample.geojson", function(response) {
        // create a leaflet geoJSON layer and put it on the map
        L.geoJson(response, {
            onEachFeature: onEachFeature,
            pointToLayer: pointtoCircle,
            filter: filterLargeRides
        }).addTo(map);
    });
}

$(document).ready(createMap);