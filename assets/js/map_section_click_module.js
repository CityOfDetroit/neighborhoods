var mapSectionClickModule = (function(informationCard){
  map.on('click', function (e) {
    console.log(e);
    var features = map.queryRenderedFeatures(e.point, { layers: ['council-fill'] });
    if (features.length) {
      //stuff to do with zooming into neighborhoods
      let feature = features[0];
      console.log(feature);
      let llb = new mapboxgl.LngLatBounds(feature.geometry.coordinates[0]);
      let center = llb.getCenter();
      console.log(center); // = LngLat {lng: -73.96365, lat: 40.78315}
      console.log(feature);
      if(feature.properties.districts == '2'){
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
            video               : '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Zi0u5nNDbPE" frameborder="0" allowfullscreen></iframe>',
            summary             : 'Sample summary text for this specific "District", good stuff. Some other news and highlights.',
            neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich'],
            avgHouseholdIncome  : '65',
            garbagePickupDay    : 'mon/fri',
            parks               : feature.properties.parks.toLocaleString(),
            residents           : feature.properties.res_count.toLocaleString(),
          }
        };
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
                  if(feature.properties.name === 'Bagley'){
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
                        neighborhoods       : ['Blackstone Park', 'Fitzgerald', 'Greenwich', 'Harmony Village'],
                        districts           : ['District 2'],
                        avgHouseholdIncome  : '65',
                        garbagePickupDay    : 'friday',
                        parks               : feature.properties.parks.toLocaleString(),
                        residents           : feature.properties.residentia.toLocaleString(),
                      }
                    };
                    console.log(feature);
                    card1.setCard(dataObj);
                    console.log(card1);
                    card1.changeDisplay(card1);
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
