var homeRandomFind = (function(){
  var randomList = [
    {
      'title' : 'JAZZ IT UP',
      'text'  : 'Immerse yourself in the world of Jazz at the "Oldest Running Jazz Club" in the world, here in Detroit.',
      'img'   : 'assets/img/DD_Web/Bakers1.jpg',
      'link'  : 'bagley.html'
    },
    {
      'title' : 'KNOW YOUR FUTURE',
      'text'  : 'Find what the future might bring over a nice cup of tea.',
      'img'   : 'assets/img/DD_Web/tarottea4.jpg',
      'link'  : 'bagley.html'
    }
  ];
  var randomNeighborhood = function randomNeighborhood() {
      let tempNeighborhood = randomList[Math.floor(Math.random() * randomList.length)];
      document.getElementById('feature-neighborhood-title').innerHTML = tempNeighborhood.title;
      document.getElementById('feature-neighborhood-text').innerHTML = tempNeighborhood.text;
      document.getElementById('feature-neighborhood-link').href = 'neighborhoods/' + tempNeighborhood.link;
      document.getElementById('content').style.backgroundImage = 'url(' + tempNeighborhood.img + ')';
  };
  window.onload = function(){
    //randomNeighborhood();
  };
})(window);

var homeStorySlider = (function(){
  var counter = 0;
  var storyList = [
    {
      'title' : 'CLEANING THINGS UP',
      'text'  : 'From dirty lots to green space',
      'img'   : 'assets/img/stories/Ronnie-jones.png',
      'link'  : 'cleaning_things_up.html'
    },
    {
      'title' : 'CATCH THESE DUMPERS',
      'text'  : 'Help the police identify suspects',
      'img'   : 'assets/img/stories/Dumping.png',
      'link'  : 'catch_these_dumpers.html'
    },
    {
      'title' : 'FAMILY-FRIENDLY',
      'text'  : 'One of the westside\'s unsung communities',
      'img'   : 'assets/img/stories/Schaefer_7-8.png',
      'link'  : 'family-friendly.html'
    },
    {
      'title' : 'PROGRESS MEASURED',
      'text'  : 'NeighborhoodWorks shows data at your fingers',
      'img'   : 'assets/img/stories/map-preview.png',
      'link'  : 'progress_measured.html'
    },
    {
      'title' : 'FITZ FORWARD',
      'text'  : 'A fresh take on development',
      'img'   : 'assets/img/stories/Fitzgerald_2.jpg',
      'link'  : 'fitz_forward.html'
    }
  ];

  function changeCounter(btn){
    console.log(btn.target.tagName);
    console.log(btn.target.id);
    var btnID = btn.target.id;
    if(btn.target.tagName === 'SPAN'){
      btnID = btn.target.parentNode.id;
      console.log(btnID);
    }
    console.log(storyList.length);
    console.log(counter);
    if(btn === undefined){
      counter = 0;
    }else{
      switch (btnID) {
        case 'swipe-left-btn':
          switch (counter) {
            case 0:
              counter = storyList.length - 1;
              break;
            default:
              counter--;
          }
          break;
        default:
          if(counter >= storyList.length - 1){
            counter = 0;
          }else{
            counter++;
          }
      }
    }
    console.log(counter);
  }
  function displayInfo(){
    document.getElementById('feature-neighborhood-title').innerHTML = storyList[counter].title;
    document.getElementById('feature-neighborhood-text').innerHTML = storyList[counter].text;
    document.getElementById('feature-neighborhood-link').href = 'stories/' + storyList[counter].link;
    document.getElementById('content').style.backgroundImage = 'url(' + storyList[counter].img + ')';
  }
  function changeSlider(btn){
    changeCounter(btn);
    displayInfo();
  }
  return {
    changeDisplay: function(btn){
      changeSlider(btn);
    },
    initialLoad: function(){
      displayInfo();
    }
  };
})(window);

window.onload = function(){
  homeStorySlider.initialLoad();
  document.querySelectorAll('.home-story-btn').forEach(function(item){
    item.addEventListener('click', function(btn){
      console.log(btn);
      homeStorySlider.changeDisplay(btn);
    });
  });
};
