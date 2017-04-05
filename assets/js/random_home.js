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
    },
    {
      'title' : 'TITLE 3',
      'text'  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'img'   : 'assets/img/DD_Web/DetVsEvery2.jpg',
      'link'  : 'bagley.html'
    },
    {
      'title' : 'TITLE 4',
      'text'  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'img'   : 'assets/img/DD_Web/execucuts4.jpg',
      'link'  : 'bagley.html'
    },
    {
      'title' : 'TITLE 5',
      'text'  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'img'   : 'assets/img/DD_Web/Avenue_of_Fashion_Mural.jpg',
      'link'  : 'bagley.html'
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
    document.getElementById('feature-neighborhood-link').href = 'neighborhoods/' + storyList[counter].link;
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
