var bagleObj = {
  properties: {
    name                : 'Bagley',
    type                : 'neighborhood',
    url                 : 'bagley.html',
    video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/B1QVshbEIG4" frameborder="0" allowfullscreen></iframe>',
    summary             : 'Sample summary text for this specific "Neighborhood", good stuff. Some other news and highlights.',
    neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich', 'Harmony Village'],
    districts           : ['District 2'],
    avgHouseholdIncome  : '65',
    garbagePickupDay    : 'friday',
    blockClubs          : '54',
    residents           : '16,866',
  }
};
var district2Obj = {
  properties: {
    name                : 'District 2',
    type                : 'district',
    url                 : 'district_2.html',
    video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Zi0u5nNDbPE" frameborder="0" allowfullscreen></iframe>',
    summary             : 'Sample summary text for this specific "District", good stuff. Some other news and highlights.',
    neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich'],
    avgHouseholdIncome  : '75',
    garbagePickupDay    : 'mon/fri',
    blockClubs          : '139',
    residents           : '105,931',
  }
};
var card1 = Object.create(informationCardModule);
var bagleyMoveThere = function bagleyMoveThere(e) {
  card1.setCard(bagleObj);
  console.log(card1);
  console.log(e.innerHTML);
  $.getJSON('http://gis.detroitmi.gov/arcgis/rest/services/WebDev/Neighborhoods/MapServer/0/query?where=&text='+ e.innerHTML +'&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson', function( data ) {
    console.log(data);
    let llb = new mapboxgl.LngLatBounds(data.features[0].geometry.rings[0]);
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
  });
  card1.changeDisplay(card1);
};
var districtTwoMoveThere = function districtTwoMoveThere(e) {
  card1.setCard(district2Obj);
  console.log(e.innerHTML.split(' '));
  $.getJSON('http://gis.detroitmi.gov/arcgis/rest/services/WebDev/Council_Districts/MapServer/0/query?where=&text='+ e.innerHTML.split(' ')[0] + '+' + e.innerHTML.split(' ')[1] +'&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson', function( data ) {
    console.log(data);
    let llb = new mapboxgl.LngLatBounds(data.features[0].geometry.rings[0]);
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
  });
  console.log(card1);
  card1.changeDisplay(district2Obj);
};
window.onload = function(){
  document.getElementById('click').checked = false;
};
