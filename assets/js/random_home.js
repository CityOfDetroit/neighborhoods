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
    randomNeighborhood();
  };
})(window);
