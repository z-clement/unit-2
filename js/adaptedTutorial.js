/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
let map;
//function to instantiate the Leaflet map
function createMap() {
    //create the map
    map = L.map('mapid', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

function onEachFeature(feature, layer) {
    let popupContent = "";
    if (feature.properties) {
        for (let property in feature.properties) {
            popupContent += "<p>" + property + ": " + feature.properties[property];
        }
        layer.bindPopup(popupContent);
    }
}

//function to retrieve the data and place it on the map
function getData(map) {
    //load the data
    $.getJSON("data/MegaCities.geojson", function(response) {
        let geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        //create a Leaflet GeoJSON layer and add it to the map
        L.geoJson(response, {
            onEachFeature: onEachFeature,
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(map);
    });
};

$(document).ready(createMap);