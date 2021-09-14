let mymap = L.map('mapid').setView([39.75621, -104.99404], 4);

//add tile layer
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(mymap);

// this adds a popup to each feature passed into the function
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

let geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

// .geoJSOn creates a new geoJSON feature which is added to the map
// the onEachFeature function is passed as an option to give each feature a popup
L.geoJSON(geojsonFeature, { onEachFeature: onEachFeature }).addTo(mymap);

let myLines = [{
    "type": "LineString",
    "coordinates": [
        [-100, 40],
        [-105, 45],
        [-110, 55]
    ]
}, {
    "type": "LineString",
    "coordinates": [
        [-105, 40],
        [-110, 45],
        [-115, 55]
    ]
}];

let myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
}

// this adds lines as geoJSOn objects to the map with the given style
L.geoJSON(myLines, { style: myStyle }).addTo(mymap);

let states = [{
    "type": "Feature",
    "properties": { "party": "Republican" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [-104.05, 48.99],
                [-97.22, 48.98],
                [-96.58, 45.94],
                [-104.03, 45.94],
                [-104.05, 48.99]
            ]
        ]
    }
}, {
    "type": "Feature",
    "properties": { "party": "Democrat" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [-109.05, 41.00],
                [-102.06, 40.99],
                [-102.03, 36.99],
                [-109.04, 36.99],
                [-109.05, 41.00]
            ]
        ]
    }
}];

// this adds the states listed above to the map and colors them depending on the political party
L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican':
                return { color: "#ff0000" };
            case 'Democrat':
                return { color: "#0000ff" };
        }
    }
}).addTo(mymap);

let geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// this changes the point feature to be marked by a circle instead of a marker
L.geoJSON(geojsonFeature, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(mymap);

let someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

// this only shows some of the features in the featureLayer passed to .geoJSON
L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(mymap);