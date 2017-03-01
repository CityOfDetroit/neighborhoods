(function(){
  var subMenuDisplayProcessing = function subMenuDisplayProcessing() {
    var subMenuDisplaySelection = 'none';
    var removeMapLayer = function removeMapLayer() {
      switch (subMenuDisplaySelection) {
        case "display-schools-btn":
          map.removeLayer('school-marker');
          map.removeLayer('library-marker');
          break;

        // case "display-bike-routes-btn":
        //   map.removeLayer('bike-lanes');
        //   break;

        case "display-restaurants-btn":
          map.removeLayer('restaurants-marker');
          break;

        case "display-parks-btn":
          map.removeLayer('parks-marker');
          break;

        case "display-historic-btn":
          map.removeLayer('historic-fill');
          map.removeLayer('historic-borders');
          break;
        default:

      }
    };
    var addMapLayer = function addMapLayer(newDisplayItem) {
      switch (newDisplayItem) {
        case "display-schools-btn":
          removeMapLayer();
          map.addLayer({
              'id': 'school-marker',
              'type': 'symbol',
              'source': 'schools',
              'layout': {
                'icon-image': 'college-15'
              },
              'filter': ['==', 'amenity', 'school']
          });
          map.addLayer({
              'id': 'library-marker',
              'type': 'symbol',
              'source': 'schools',
              'layout': {
                'icon-image': 'library-15'
              },
              'filter': ['==', 'amenity', 'library']
          });
          break;

        case "display-parks-btn":
          removeMapLayer();
          map.addLayer({
              'id': 'parks-marker',
              'type': 'symbol',
              'source': 'parks',
              'layout': {
                'icon-image': 'park-15'
              },

          });
          break;

        case "display-restaurants-btn":
          removeMapLayer();
          map.addLayer({
              'id': 'restaurants-marker',
              'type': 'symbol',
              'source': 'restaurantsBars',
              'layout': {
                'icon-image': 'restaurant-15'
              },

          });
          break;

        case "display-bike-routes-btn":
          removeMapLayer();
          map.addLayer({
              'id': 'bike-lanes',
              'type': 'line',
              'source': 'bikes',
              'layout': {
                  'visibility': 'visible',
                  'line-join': 'round',
                  'line-cap': 'round'
              },
              'paint': {
                  'line-color': '#05E447',
                  'line-width': 4
              }

          });
          break;

        case "display-historic-btn":
          removeMapLayer();
          map.addLayer({
            "id": "historic-fill",
            "type": "fill",
            "source": "historic",
            "layout": {},
            "paint": {
              "fill-color": "rgb(246, 136, 7)"
            }
          });

          map.addLayer({
            "id": "historic-borders",
            "type": "line",
            "source": "historic",
            "layout": {},
            "paint": {
              "line-color": "white",
              "line-width": 1
            }
          });
          break;
        default:

      }
    };
    function checkSubMenuRequest(obj) {
      console.log('current:' + subMenuDisplaySelection);
      if(subMenuDisplaySelection != obj.id){
        (subMenuDisplaySelection == 'none') ? 0:document.querySelector('.sub-menu-item.active').className = 'sub-menu-item';
        addMapLayer(obj.id);
        subMenuDisplaySelection = obj.id;
        console.log('new:' + subMenuDisplaySelection);
        obj.className = 'sub-menu-item active';
      }else{
        obj.className = 'sub-menu-item';
        removeMapLayer();
        subMenuDisplaySelection = 'none';
      }
    }
    var scrollToSection = function scrollToSection(obj) {
      let anchor = obj.getAttribute('data-anchor');
      anchor = document.querySelector('.' + anchor);
      if(anchor !== null){
        anchor.scrollIntoView();
        console.log(document.getElementById('click').checked);
        menuDisplay();
        document.getElementById('click').checked = false;
        console.log(document.getElementById('click').checked);
      }else{
        console.log('Section does not exist.');
      }
    };
    function changeMenuClassSet(newClassList){
      document.querySelector('.sub-menu-row').className = newClassList;
    }
    return {
      changeDisplay: function(obj) {
        checkSubMenuRequest(obj);
      },
      goToAnchor: function(obj) {
        scrollToSection(obj);
      }
    };
  };
  var subMenu = subMenuDisplayProcessing();
  var subMenuAction = function subMenuAction(e) {
    if(e.getAttribute('data-anchor') === null){
      console.log('calling changeDisplay');
      subMenu.changeDisplay(e);
    }else{
      subMenu.goToAnchor(e);
    }

  };
  var displayMenuProcess = function displayMenuProcess() {
    var subMenuDisplayProcessing = 'false';
    function checkIfMenuActive() {
      if(subMenuDisplayProcessing == 'false'){
        subMenuDisplayProcessing = 'true';
        let subMenu = document.querySelector('.sub-menu-row');
        let subMenuClasses = subMenu.className.split(' ');
        let firstTime = 1;
        subMenuClasses.forEach(function(item){
          if(item == 'active'){
            changeMenuClassSet('sub-menu-row');
            document.getElementById('click').checked = true;
            --firstTime;
            return 0;
          }else{
            changeMenuClassSet('sub-menu-row active');
            document.getElementById('click').checked = false;
            --firstTime;
            return 0;
          }
        });
        let delay=1000;
        setTimeout(function() {
          subMenuDisplayProcessing = 'false';
        }, delay);
      }
    }
    function changeMenuClassSet(newClassList){
      document.querySelector('.sub-menu-row').className = newClassList;
    }
    return {
      changeDisplay: function() {
        checkIfMenuActive();
      }
    };
  };
  var menu = displayMenuProcess();
  var menuDisplay = function menuDisplay() {
    menu.changeDisplay();
  };
  var moveToPoint = function moveToPoint(coordinates){
    map.flyTo({
      center: coordinates
    });
  };
  var moveToPointAction = function moveToPointAction(triggerObj) {
      let triggerID = '';
      if(triggerObj.id === ''){
        triggerID = triggerObj.parentNode.id;
      }else{
        triggerID = triggerObj.id;
      }
      if(triggerID == 'search-btn'){
        moveToPoint([-83.1510047, 42.426127]);
      }else{
        if(event.keyCode == 13) {
          moveToPoint([-83.1510047, 42.426127]);
        }
      }

      // map.fitBounds([[
      //       -83.1510047, 42.426127
      // ]]);
  };
  var moveBackToTop = function moveBackToTop() {
    document.getElementById('navigation').scrollIntoView();
  };
  var backToTopBtn = document.getElementById('back-top-btn');
  if(backToTopBtn !== null){
    backToTopBtn.addEventListener('click', moveBackToTop);
  }
  var searchBtn = document.getElementById('search-btn');
  if(searchBtn !== null){
    searchBtn.addEventListener('click', function (e) {
      moveToPointAction(e.target);
    });
  }
  var addresSearch = document.getElementById('address-search');
  if(addresSearch !== null){
    addresSearch.addEventListener('keydown', function (e) {
      moveToPointAction(e);
    });
  }
  document.getElementById('navigation').addEventListener('click', menuDisplay);
  Array.from(document.getElementsByClassName('sub-menu-item')).forEach(function(item) {
    item.addEventListener('click', function (e) {
      subMenuAction(e.target);
    });
  });
})(window);
