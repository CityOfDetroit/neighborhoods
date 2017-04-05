var card1 = Object.create(informationCardModule);
var bagleyMoveThere = function bagleyMoveThere(e) {
  console.log(e.innerHTML);
  $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1/query?where=&text='+ e.innerHTML +'&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson', function( data ) {
    console.log(data);
    let llb = new mapboxgl.LngLatBounds(data.features[0].geometry.coordinates[0]);
    let center = llb.getCenter();
    map.flyTo({
        center: center,
        zoom: 13,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
            return t;
        }
    });
    let dataObj = {
      properties: {
        name                : e.innerHTML,
        type                : 'neighborhood',
        url                 : e.innerHTML + '.html',
        video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/B1QVshbEIG4" frameborder="0" allowfullscreen></iframe>',
        summary             : 'Sample summary text for this specific "Neighborhood", good stuff. Some other news and highlights.',
        neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich', 'Harmony Village'],
        districts           : ['District 2'],
        avgHouseholdIncome  : '65',
        garbagePickupDay    : 'friday',
        parks               : data.features[0].properties.parks.toLocaleString(),
        residents           : data.features[0].properties.residentia.toLocaleString()
      }
    };
    card1.setCard(dataObj);
    console.log(card1);
    card1.changeDisplay(card1);
  });
};
var districtTwoMoveThere = function districtTwoMoveThere(e) {
  console.log(e.innerHTML.split(' '));
  $.getJSON( 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text='+ e.innerHTML.split(' ')[1] +'&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson', function( data ) {
    console.log(data);
    let llb = new mapboxgl.LngLatBounds(data.features[0].geometry.coordinates[0]);
    let center = llb.getCenter();
    map.flyTo({
        center: center,
        zoom: 12,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
            return t;
        }
    });
    let dataObj = {
      properties: {
        name                : 'District '+ e.innerHTML.split(' ')[1],
        type                : 'district',
        url                 : 'district_'+ e.innerHTML.split(' ')[1] +'.html',
        video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Zi0u5nNDbPE" frameborder="0" allowfullscreen></iframe>',
        summary             : 'Sample summary text for this specific "District", good stuff. Some other news and highlights.',
        neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich'],
        avgHouseholdIncome  : '75',
        garbagePickupDay    : 'mon/fri',
        parks               : data.features[0].properties.parks.toLocaleString(),
        residents           : data.features[0].properties.res_count.toLocaleString()
      }
    };
    card1.setCard(dataObj);
    console.log(card1);
    card1.changeDisplay(card1);
  });
};
window.onload = function(){
  document.getElementById('click').checked = false;
};
