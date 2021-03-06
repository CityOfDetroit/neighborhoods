var informationCardModule = (function(){
  var informationCard = {
    name                : '',
    type                : '',
    url                 : '',
    video               : '',
    active              : '',
    info                : '',
    summary             : '',
    mayor               : '',
    mayorURL            : '',
    mayorImg            : '',
    council             : '',
    councilURL          : '',
    councilImg          : '',
    dManager            : '',
    dManagerURL         : '',
    districts           : '',
    neighborhoods       : '',
    demolitions         : '',
    investments         : '',
    garbagePickupDay    : '',
    parks               : '',
    residents           : '',
    openNewPage: function() {
      console.log(this.name);
      var win;
      if(this.type === 'neighborhood'){
         win = window.open('neighborhoods/' + this.url, '_blank');
      }else{
        win = window.open('districts/' + this.url, '_blank');
      }
      if (win) {
          //Browser has allowed it to be opened
          win.focus();
      } else {
          //Browser has blocked it
          alert('Please allow popups for this website');
      }
    },
    changeDisplay: function() {
      (this.active) ? this.hideCard(): this.displayCard();
    },
    displayCard: function() {
      this.loadCardData();
      console.log('will display card');
      document.getElementById('neighborhood-info-container').className = 'active';
      this.active = true;
    },
    hideCard: function() {
      console.log('will hide card');
      document.getElementById('neighborhood-info-container').className = '';
      this.active = false;
    },
    setCard: function(infoObj){
      if(Object.keys(infoObj.properties).length !== 0){
        this.name = infoObj.properties.name;
        this.type = infoObj.properties.type;
        this.active = false;
        this.url = infoObj.properties.url;
        this.video = infoObj.properties.video;
        this.summary = infoObj.properties.summary;
        this.mayor = infoObj.properties.mayor;
        this.mayorURL = infoObj.properties.mayorURL;
        this.mayorImg = infoObj.properties.mayorImg;
        this.council = infoObj.properties.council;
        this.councilURL = infoObj.properties.councilURL;
        this.councilImg = infoObj.properties.councilImg;
        this.dManager = infoObj.properties.dManager;
        this.dManagerURL = infoObj.properties.dManagerURL;
        this.neighborhoods = infoObj.properties.neighborhoods;
        (infoObj.properties.type === 'neighborhood') ? this.districts = infoObj.properties.districts : 0;
        // (infoObj.properties.type === 'district') ? this.demolitions = infoObj.properties.demolitions : 0;
        this.investments = infoObj.properties.investments;
        this.garbagePickupDay = infoObj.properties.garbagePickupDay;
        this.parks = infoObj.properties.parks;
        this.residents = infoObj.properties.residents;
      }
    },
    loadCardData: function() {
      console.log('will load data to card');
      document.getElementById('neighborhood-name').innerHTML = this.name;
      document.querySelector('.info-card-row > .neighborhood-summary').innerHTML = this.summary;
      document.querySelector('.mayor > .text-content').innerHTML = '<span>Mayor</span><a href="'+ this.mayorURL +'" target="_blank">'+ this.mayor +'</a>';
      document.querySelector('.mayor > .img-container').innerHTML = '<img src="' + this.mayorImg + '" alt="' + this.mayor + '"></img>';
      document.querySelector('.council > .text-content').innerHTML = '<span>Council</span><a href="'+ this.councilURL +'" target="_blank">'+ this.council +'</a>';
      document.querySelector('.council > .img-container').innerHTML = '<img src="' + this.councilImg + '" alt="' + this.council + '"></img>';
      document.querySelector('.distrit-manager-content > .text-content').innerHTML = '<span>District Manager</span><a href="'+ this.dManagerURL +'" target="_blank">'+ this.dManager +'</a>';
      document.querySelector('.video-wrap').innerHTML = this.video;
      (this.type === 'district') ? document.getElementById('card-type').innerHTML = 'District' : document.getElementById('card-type').innerHTML = 'Nearby';
      (this.type === 'neighborhood') ? this.createDistrictsList() : document.querySelector('.corresponding-districts').innerHTML = '';
      this.createNeighborhoodsList();
      this.createFourSquareData();
    },
    createDistrictsList: function () {
      let tempHtml = '<span><strong>District(s):</strong></span> <span class="districts-list">';
      let tracker = 0;
      let size = this.districts.length;
      this.districts.forEach(function(item){
        tempHtml += '<a href="#" onclick="districtTwoMoveThere(this)">' + item + '</a>';
        ((tracker < size) && (tracker + 1) !== size) ? tempHtml += ', ': 0;
        tracker++;
      });
      tempHtml += '</span>'
      document.querySelector('.corresponding-districts').innerHTML = tempHtml;
    },
    createNeighborhoodsList: function () {
      let tempHtml = '';
      let tracker = 0;
      this.neighborhoods.forEach(function(item){
        tempHtml += '<a href="#">' + item + '</a>';
        (tracker < (this.neighborhoods.length)) ? tempHtml += ', ': 0;
        tracker++;
      });
      (this.type === 'district') ? this.createDistrictNeighborhoodsMoreBtn(tempHtml): document.querySelector('.near-neighborhoods-list').innerHTML = tempHtml;
    },
    createDistrictNeighborhoodsMoreBtn: function (tempHtml) {
      tempHtml += '<a href="#" onclick="bagleyMoveThere(this)">Bagley</a>, <a class="more-neighborhoods-btn" href="districts/' + this.url + '#neighborhoods-list" target="_new">MORE</a>';
      document.querySelector('.near-neighborhoods-list').innerHTML = tempHtml;
    },
    createFourSquareData: function () {
      // if(this.type === 'neighborhood'){
      //   document.getElementById('home-price-or-demolitions').innerHTML = 'AVG.HOME PRICE';
      //   document.getElementById('household-income').innerHTML = '$' + this.investments + 'k';
      //   document.getElementById('home-price-or-demolitions-img').src = 'assets/img/money-wht.png';
      // }else{
      //   document.getElementById('home-price-or-demolitions').innerHTML = 'DEMOLITIONS';
      //   document.getElementById('household-income').innerHTML = this.demolitions;
      //   document.getElementById('home-price-or-demolitions-img').src = 'assets/img/demolition_wht.png';
      // }
      document.getElementById('home-price-or-demolitions').innerHTML = 'INVESTMENTS';
      document.getElementById('household-income').innerHTML = '$' + this.investments + 'k';
      document.getElementById('home-price-or-demolitions-img').src = 'assets/img/money-wht.png';
      document.getElementById('garbage-pickup-day').innerHTML = this.garbagePickupDay.toUpperCase();
      document.getElementById('block-clubs').innerHTML = this.parks;
      document.getElementById('residents').innerHTML = this.residents;
    }
  };
  return informationCard;
})(window);
