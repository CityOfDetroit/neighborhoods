// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';

// This adds the map to your page
var map = new mapboxgl.Map({
    // container id specified in the HTML
    container: 'map', // style URL
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-83.1, 42.375], // starting position
    zoom: 10.5 // starting zoom
});



//13/42.4170/-83.2357

// add schools
var schools = "http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/schools_libraries/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson";

//add neighborhoods
var neighborhoods = 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

var neighborhoods_labels = 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

var councils = 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

var councils_labels = 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

//add parks
var parks = "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Parks/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson";

var historic = 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/national_historic_districts/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

var restaurantsBars =
'https://api.foursquare.com/v2/venues/search?v=20161016&query=cafe%2Crestaurant%2Cbar&intent=checkin&client_id=BSLR5UVUCA5M0JG1VDBCIT3OHAZJNJ3ZLIE4Q51ENVHPU4JG&client_secret=Z22OJZRKVVIBY1DDHL0GDHK2MX4ZNKDEIZKDPDVITE5BWAXR&near=detroit';

var flatColorMap = '#55899e';
// var popColorMap = '#269AEF';
//var flatColorMap = '#00C1ED';
var popColorMap = '#55b74c';
// load schools
var loadFoursquareAPI = function loadFoursquareAPI(foursquare_url) {
  // make the call to the foursquare api, add the results to the map
  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function json(response) {
    return response.json();
  }

  fetch(foursquare_url)
    .then(status)
    .then(json)
    .then(function(data) {
    console.log(data);
    // add the results to the map
    var barSites = data.response.venues;
    var barGeojson = [];
    for (var i = 0; i < barSites.length; i++) {
      var barFeature = {
        type: 'Feature',
        properties: {
          name: barSites[i].name,
          address: barSites[i].location.address + ', ' + barSites[i].location.city + ' ' + barSites[i].location.state + ' ' + barSites[i].location.postalCode,
          url: barSites[i].url
        },
        geometry: {
          type: 'Point',
          coordinates: [
            barSites[i].location.lng,
            barSites[i].location.lat
          ]
        }
      };
      barGeojson.push(barFeature);
    }
    map.addSource('restaurantsBars', {
        type: 'geojson',
        "data": {
          "type": "FeatureCollection",
          "features": barGeojson
        }
    });
  });
};
map.on('load', function (e) {
    loadFoursquareAPI(restaurantsBars);

    map.addSource('schools', {
        type: 'geojson',
        data:schools
    });

    map.addSource('parks', {
        type: 'geojson',
        data:parks
    });

    map.addSource('historic', {
      type: 'geojson',
      data: historic
    });

    map.addSource('councils', {
      type: 'geojson',
      data: councils
    });
    map.addSource('councils_labels', {
      type: 'geojson',
      data: councils_labels
    });
    //add a fill layer
    map.addLayer({
      "id": "council-fill",
      "type": "fill",
      "source": "councils", maxzoom: 12,
      "layout": {},
      "paint": {
        "fill-color": flatColorMap,
        "fill-opacity": 1,
      }
    });

    map.addLayer({
      "id": "council-fills-hover",
      "type": "fill",
      "source": "councils", maxzoom: 12,
      "layout": {},
      "paint": {
        "fill-color": popColorMap,
        "fill-opacity": 1
      },
      "filter": ["==", "districts", ""]
    });


    map.addLayer({
      'id': 'councils_labels',
      'type': 'symbol',
      'source': 'councils_labels', maxzoom: 12,
      'layout': {
        'text-field': 'District {districts}'
      },
      'paint': {
        'text-color': 'black'

      }
    });
// ================== neighborhoods =========================
    map.addSource('neighborhoods', {
      type: 'geojson',
      data: neighborhoods
    });
    map.addSource('neighborhoods_labels', {
      type: 'geojson',
      data: neighborhoods_labels
    });

    map.addLayer({
      "id": "neighborhoods-fill",
      "type": "fill",
      "source": "neighborhoods", minzoom: 12,
      "layout": {},
      "paint": {
        "fill-color": flatColorMap,
        "fill-opacity": 0.9,
      }
    });

    map.addLayer({
      "id": "neighborhoods-borders",
      "type": "line",
      "source": "neighborhoods",  minzoom: 12,
      "layout": {},
      "paint": {
        "line-color": "#EAE472",
        "line-width": 1
      }
    });

    map.addLayer({
      "id": "neighborhoods-fills-hover",
      "type": "fill",
      "source": "neighborhoods",  minzoom: 12,
      "layout": {},
      "paint": {
        "fill-color": popColorMap,
        "fill-opacity": 1
      },
      "filter": ["==", "name", ""]
    });

    map.addLayer({
      'id': 'neighborhoods-labels',
      'type': 'symbol',
      'source': 'neighborhoods_labels',
              'minzoom': 12,
      'layout': {
        'text-field': '{name}'
      },
      'paint': {
        'text-color': 'black'

      }
    });

    map.addLayer({
      "id": "council-borders",
      "type": "line",
      "source": "councils",
      "layout": {},
      "paint": {
        "line-color": "white",
        "line-width": 3
      }
    });
});

map.on("mousemove", function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["council-fill"]
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  if (features.length) {
    map.setFilter("council-fills-hover", ["==", "districts", features[0].properties.districts]);
    var feature = features[0];
  } else {
    features = map.queryRenderedFeatures(e.point, {
      layers: ["neighborhoods-fill"]
    });
    if(features.length){
      map.setFilter("neighborhoods-fills-hover", ["==", "name", features[0].properties.name]);
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    }else{
      map.setFilter("council-fills-hover", ["==", "name", ""]);
    }
  }
});

// Reset the state-fills-hover layer's filter when the mouse leaves the map
map.on("mouseout", function() {
  map.setFilter("council-fills-hover", ["==", "name", ""]);
  map.setFilter("hoods-fills-hover", ["==", "name", ""]);
});
