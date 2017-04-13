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
    console.log(center);
    let tempURL = 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text=&objectIds=&time=&geometry='+center.lng+'%2C+'+center.lat+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json';
    $.getJSON(tempURL, function( districtData ) {
      console.log(districtData);
      let dataObj = {
        properties: {
          name                : data.features[0].properties.name,
          type                : 'neighborhood',
          url                 : data.features[0].properties.name + '.html',
          video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/B1QVshbEIG4" frameborder="0" allowfullscreen></iframe>',
          summary             : 'Sample summary text for this specific "Neighborhood", good stuff. Some other news and highlights.',
          mayor               : 'Mayor Duggan',
          mayorURL            : 'http://www.detroitmi.gov/Government/Mayors-Office/Administration#duggan',
          mayorImg            : 'assets/img/mayor-council/MayorDuggan.jpg',
          council             : '',
          councilURL          : '',
          councilImg          : '',
          dManager            : '',
          dManagerURL         : '',
          neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich', 'Harmony Village'],
          districts           : [],
          investments         : '65',
          garbagePickupDay    : 'friday',
          parks               : data.features[0].properties.parks.toLocaleString(),
          residents           : data.features[0].properties.residentia.toLocaleString(),
        }
      };
      districtData.features.forEach(function(item) {
        console.log(item.attributes.districts);
        dataObj.properties.districts.push('District ' + item.attributes.districts);
      });
      switch (districtData.features[0].attributes.districts) {
        case '1':
          dataObj.properties.council = "James Tate";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/James-Tate";
          dataObj.properties.councilImg = "assets/img/mayor-council/James-Tate.jpg"
          dataObj.properties.dManager = "Stephanie Young - 313.236.3473";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district1";
          break;

        case '2':
          dataObj.properties.council = "George Cushingberry Jr.";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/George-Cushingberry";
          dataObj.properties.councilImg = "assets/img/mayor-council/George-Cushingberry.jpg"
          dataObj.properties.dManager = "Kim Tandy - 313.236.3494";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district2";
          break;

        case '3':
          dataObj.properties.council = "Scott Benson";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Scott-Benson";
          dataObj.properties.councilImg = "assets/img/mayor-council/Scott-Benson.jpg"
          dataObj.properties.dManager = "Erinn Harris - 313.236.3504";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district3";
          break;

        case '4':
          dataObj.properties.council = "André L. Spivey";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Andre-Spivey";
          dataObj.properties.councilImg = "assets/img/mayor-council/Andre-Spivey.jpg"
          dataObj.properties.dManager = "Letty Azar - 313.236.3518";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district4";
          break;

        case '5':
          dataObj.properties.council = "Mary Sheffield";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Mary-Sheffield";
          dataObj.properties.councilImg = "assets/img/mayor-council/Mary-Sheffield.jpg"
          dataObj.properties.dManager = "Vince Keenan - 313.236.3523";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district5";
          break;

        case '6':
          dataObj.properties.council = "Raquel Castañeda-López";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Raquel-Castaneda-Lopez";
          dataObj.properties.councilImg = "assets/img/mayor-council/Castaneda-Lopez.jpg"
          dataObj.properties.dManager = "Ninfa Cancel - 313.236.3530";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district6";
          break;
        default:
          dataObj.properties.council = "Gabe Leland";
          dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Gabe-Leland";
          dataObj.properties.councilImg = "assets/img/mayor-council/Gabe-Leland.jpg"
          dataObj.properties.dManager = "Ray Solomon II - 313.236.3516";
          dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district7";
          break;
      }
      card1.setCard(dataObj);
      console.log(card1);
      card1.changeDisplay(card1);
    });
  });
};
var districtTwoMoveThere = function districtTwoMoveThere(e) {
  console.log(e.innerHTML.split(' '));
  $.getJSON( 'http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text='+e.innerHTML.split(' ')[1]+'&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson', function( data ) {
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
    let dataObj = {
      properties: {
        name                : 'District ' + data.features[0].attributes.districts,
        type                : 'district',
        url                 : 'district_' + data.features[0].attributes.districts + '.html',
        video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Zi0u5nNDbPE" frameborder="0" allowfullscreen></iframe>',
        summary             : 'Sample summary text for this specific "District", good stuff. Some other news and highlights.',
        mayor               : 'Mayor Duggan',
        mayorURL            : 'http://www.detroitmi.gov/Government/Mayors-Office/Administration#duggan',
        mayorImg            : 'assets/img/mayor-council/MayorDuggan.jpg',
        council             : '',
        councilURL          : '',
        councilImg          : '',
        dManager            : '',
        dManagerURL         : '',
        neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich'],
        investments         : '163',
        garbagePickupDay    : 'mon/fri',
        parks               : data.features[0].attributes.parks.toLocaleString(),
        residents           : data.features[0].attributes.res_count.toLocaleString(),
      }
    };
    switch (data.features[0].attributes.districts) {
      case '1':
        dataObj.properties.council = "James Tate";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/James-Tate";
        dataObj.properties.councilImg = "assets/img/mayor-council/James-Tate.jpg"
        dataObj.properties.dManager = "Stephanie Young - 313.236.3473";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district1";
        break;

      case '2':
        dataObj.properties.council = "George Cushingberry Jr.";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/George-Cushingberry";
        dataObj.properties.councilImg = "assets/img/mayor-council/George-Cushingberry.jpg"
        dataObj.properties.dManager = "Kim Tandy - 313.236.3494";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district2";
        break;

      case '3':
        dataObj.properties.council = "Scott Benson";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Scott-Benson";
        dataObj.properties.councilImg = "assets/img/mayor-council/Scott-Benson.jpg"
        dataObj.properties.dManager = "Erinn Harris - 313.236.3504";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district3";
        break;

      case '4':
        dataObj.properties.council = "André L. Spivey";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Andre-Spivey";
        dataObj.properties.councilImg = "assets/img/mayor-council/Andre-Spivey.jpg"
        dataObj.properties.dManager = "Letty Azar - 313.236.3518";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district4";
        break;

      case '5':
        dataObj.properties.council = "Mary Sheffield";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Mary-Sheffield";
        dataObj.properties.councilImg = "assets/img/mayor-council/Mary-Sheffield.jpg"
        dataObj.properties.dManager = "Vince Keenan - 313.236.3523";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district5";
        break;

      case '6':
        dataObj.properties.council = "Raquel Castañeda-López";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Raquel-Castaneda-Lopez";
        dataObj.properties.councilImg = "assets/img/mayor-council/Castaneda-Lopez.jpg"
        dataObj.properties.dManager = "Ninfa Cancel - 313.236.3530";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district6";
        break;
      default:
        dataObj.properties.council = "Gabe Leland";
        dataObj.properties.councilURL = "http://www.detroitmi.gov/Government/City-Council/Gabe-Leland";
        dataObj.properties.councilImg = "assets/img/mayor-council/Gabe-Leland.jpg"
        dataObj.properties.dManager = "Ray Solomon II - 313.236.3516";
        dataObj.properties.dManagerURL = "http://www.detroitmi.gov/Neighborhoods#dt-district7";
        break;
    }
    card1.setCard(dataObj);
    console.log(card1);
    card1.changeDisplay(card1);
  });
};
window.onload = function(){
  document.getElementById('click').checked = false;
};
var searchBar = Object.create(mapSearchBar);
var searchBtn = document.getElementById('search-btn');
if(searchBtn !== null){
  searchBtn.addEventListener('click', function (e) {
    searchBar.searchPlace(e.target);
  });
}
var addresSearch = document.getElementById('address-search');
if(addresSearch !== null){
  addresSearch.addEventListener('keydown', function (e) {
    if (e.preventDefaulted) {
      return; // Do nothing if event already handled
    }
    searchBar.searchPlace(e);
  });
}
