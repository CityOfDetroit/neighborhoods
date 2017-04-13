var mapSearchBar = (function(){
  let searchList = [
    'District 1',
    'District 2',
    'District 3',
    'District 4',
    'District 5',
    'District 6',
    'District 7',
    'Bagley'
  ];
  let moveToPoint = function moveToPoint(coordinates){
    map.flyTo({
      center: coordinates
    });
  };
  let searchValueInList = function searchValueInList(triggerObj){
    console.log(triggerObj);
    let foundResults = [];
    searchList.forEach(function(item){
      console.log(item);
      let tempString = null;
      (triggerObj.keyCode > 47 && triggerObj.keyCode < 91) ? tempString = triggerObj.target.value + triggerObj.key : tempString = triggerObj.target.value;
      (triggerObj.keyCode === 8)? tempString = tempString.slice(0, -1): 0;
      console.log(tempString);
      if(tempString !== ''){
        (item.toLowerCase().indexOf(tempString.toLowerCase()) >= 0) ?  foundResults.push(item) : 0;
      }
    });
    console.log(foundResults);
  };
  var moveToPointAction = function moveToPointAction(triggerObj) {
    console.log(triggerObj);
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
      }else{
        searchValueInList(triggerObj);
      }
    }
  };
  return {
    searchPlace: moveToPointAction
  }
})(window);
