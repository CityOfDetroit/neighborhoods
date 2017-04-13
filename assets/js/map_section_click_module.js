var mapSectionClickModule = (function(informationCard){
  map.on('click', function (e) {
    console.log(e);
    var features = map.queryRenderedFeatures(e.point, { layers: ['council-fill'] });
    if (features.length) {
      //stuff to do with zooming into neighborhoods
      let feature = features[0];
      console.log(feature);
      let llb = null;
      (feature.geometry.coordinates[0].length === 1)? llb = new mapboxgl.LngLatBounds(feature.geometry.coordinates[0][0]): llb = new mapboxgl.LngLatBounds(feature.geometry.coordinates[0]);
      let center = llb.getCenter();
      console.log(center); // = LngLat {lng: -73.96365, lat: 40.78315}
      console.log(feature);
      if(feature.properties.districts !== undefined){
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
            name                : 'District ' + feature.properties.districts,
            type                : 'district',
            url                 : 'district_' + feature.properties.districts + '.html',
            video               : '<video width="100%" height="100%" controls="true" loop="true"><source src="assets/video/District2_Draft2.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
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
            investments         : '15,819',
            garbagePickupDay    : 'mon/fri',
            parks               : feature.properties.parks.toLocaleString(),
            residents           : feature.properties.res_count.toLocaleString(),
          }
        };
        switch (feature.properties.districts) {
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
      }
    }else {
      features = map.queryRenderedFeatures(e.point, { layers: ['school-marker'] });
      if (!features.length) {
        features = map.queryRenderedFeatures(e.point, { layers: ['library-marker'] });
        if (!features.length) {
          features = map.queryRenderedFeatures(e.point, { layers: ['bike-lanes'] });
          if (!features.length) {
            features = map.queryRenderedFeatures(e.point, { layers: ['parks-marker'] });
            if (!features.length) {
              features = map.queryRenderedFeatures(e.point, { layers: ['historic-fill'] });
              if (!features.length) {
                features = map.queryRenderedFeatures(e.point, { layers: ['restaurants-marker'] });
                if (!features.length) {
                  features = map.queryRenderedFeatures(e.point, { layers: ['neighborhoods-fill'] });
                  let feature = features[0];
                  if(feature.properties.residentia !== undefined){
                    console.log(feature);
                    console.log(JSON.stringify(feature.geometry));
                    console.log(e);
                    $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1/query?where=&text='+ feature.properties.name +'&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json',function( data ) {
                      console.log(data);
                      // let tempJSON = JSON.stringify(data.features[0].geometry);
                      // console.log(tempJSON);
                      // require(["esri/config"], function(esriConfig) {
                      //   esriConfig.defaults.io.corsEnabledServers.push("https://gis.detroitmi.gov/arcgis/");
                      // });
                      // require([
                      //   "esri/request"
                      // ], function(esriRequest, tempJSON) {
                      //   var layerUrl = "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1";
                      //   var layersRequest = esriRequest({
                      //     url: layerUrl,
                      //     content: {
                      //       geometry : tempJSON,
                      //       geometryType : 'esriGeometryPolygon',
                      //       spatialReference : {
                      //         wkid: 4326,
                      //         latestWkid: 4326
                      //       },
                      //       outFields : '*',
                      //     },
                      //     handleAs: "html",
                      //     callbackParamName: "callback"
                      //   });
                      //   layersRequest.then(
                      //     function(response) {
                      //       console.log("Success: ", response);
                      //   }, function(error) {
                      //       console.log("Error: ", error.message);
                      //   });
                      // });
                      // require([
                      //   "dojo/dom", "dojo/on",
                      //   "esri/tasks/query", "esri/tasks/QueryTask", "dojo/domReady!"
                      // ], function (dom, on, Query, QueryTask) {
                      //
                      //   var queryTask = new QueryTask("https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1");
                      //   var query = new Query();
                      //   query.returnGeometry = false;
                      //   query.geometry = tempJSON;
                      //   query.geometryType = 'esriGeometryPolygon';
                      //   query.spatialRel = 'esriSpatialRelIntersects';
                      //   query.outFields = '*';
                      //   query.wkid = 4326;
                      //   queryTask.execute(query, showResults);
                      //
                      //   function showResults (results) {
                      //     console.log(results);
                      //   }
                      // });

                    });

                    $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text=&objectIds=&time=&geometry='+e.lngLat.lng+'%2C+'+e.lngLat.lat+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json', function( data ) {
                      console.log(data);
                      let llb = new mapboxgl.LngLatBounds(feature.geometry.coordinates[0]);
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
                          name                : feature.properties.name,
                          type                : 'neighborhood',
                          url                 : feature.properties.name + '.html',
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
                          parks               : feature.properties.parks.toLocaleString(),
                          residents           : feature.properties.residentia.toLocaleString(),
                        }
                      };
                      data.features.forEach(function(item) {
                        console.log(item.attributes.districts);
                        dataObj.properties.districts.push('District ' + item.attributes.districts);
                      });
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
                      console.log(feature);
                      card1.setCard(dataObj);
                      console.log(card1);
                      card1.changeDisplay(card1);
                    });
                  }
                  return;
                }
              }
            }
          }
        }
      }
      console.log(features);
      var feature = features[0];
      var popup = null;
      if(feature.layer.id === 'school-marker'){
        popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML(
              '<h5>' + feature.properties.name + '</h5><p>' + feature.properties.type + '</p>'
            )
            .addTo(map);
      }else{
        popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML(
              '<h5>' + feature.properties.name + '</h5>'
            )
            .addTo(map);
      }
    }
  });
})(informationCardModule);
