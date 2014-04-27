/*global $:false, google:false, GoogleMap:false*/
/*jshint camelcase:true, curly:true, eqeqeq:true, freeze:true, immed:true,
 indent:2, newcap:true, noarg:true, noempty:true, nonew:true, quotmark:double,
 undef:true, unused:true, strict:true, trailing:true */
(function(global, undefined) {
  "use strict";

  global.GoogleMap = GoogleMap;

  // TODO Introduce es5-shim
  // Function.prototype.bind2 = function(context) {
  //   var f = this;
  //   return function() {
  //     f.apply(context,arguments);
  //   };
  // };

  if ( !Function.prototype.hasOwnProperty( "bind" ) ) {
    (function () {
      var shim = document.createElement( "script" );
      shim.src = "es5-shim.js";
      var script = document.getElementsByTagName( "script" )[0];
      script.parentNode.insertBefore( shim, script );
    }());
  }

  function GoogleMap() {

    this._geocoder = new google.maps.Geocoder();
    this._map = null;
    this._mapDiv = null;
    this._mapOptions = [];
    this._markers = [];
    this._textArea = null;

    this._goLoop = this._goLoop.bind(this);
    this._onGeocodeGet = this._onGeocodeGet.bind(this);
    this._onTimeout = this._onTimeout.bind(this);
    this._setAllMap = this._setAllMap.bind(this);

    this.deleteFlag = this.deleteFlag.bind(this);
    this.hideFlag = this.hideFlag.bind(this);
    this.initialize = this.initialize.bind(this);
    this.showFlag = this.showFlag.bind(this);
    this.setMapDiv = this.setMapDiv.bind(this);
    this.setMapOptions = this.setMapOptions.bind(this);
    this.setTextArea = this.setTextArea.bind(this);
    this.textOnChange = this.textOnChange.bind(this);
  }

  GoogleMap.prototype._addMarker = function(location, title) {
    var marker,
        markerParameter = [];

    markerParameter = {
      map: this._map,
      position: location,
      title: title
    };

    marker = new google.maps.Marker(markerParameter);
    this._markers.push(marker);
  };

  GoogleMap.prototype._goLoop = function(textArr, i){
    // TODO var is the first statement
    var tempF = this._onTimeout.bind(this);
    i--;
    if (i < 0) {
      return;
    }

    if (textArr[i].length <= 0){
      this._goLoop(textArr, i);
    } else {
      this._geocoder.geocode(
        {"address":textArr[i]},
        this._onGeocodeGet
      );
      setTimeout(tempF(textArr, i), 1000);
    }
  };

  GoogleMap.prototype._onGeocodeGet = function(results, status) {
    var address,
    LatLng;

    if (status === google.maps.GeocoderStatus.OK) {
      address = results[0].formatted_address;
      LatLng = results[0].geometry.location;
      this._map.setCenter(LatLng);  //將地圖中心定位到查詢結果
      this._addMarker(LatLng, address);
    }
  };

  GoogleMap.prototype._onTimeout = function(textArr, i) {
    this._goLoop(textArr, i);
  };

  GoogleMap.prototype._setAllMap = function(factor) {
    var i = 0;
    for (i; i < this._markers.length; i++) {
      this._markers[i].setMap(factor);
    }
  };

  GoogleMap.prototype.deleteFlag = function() {
    this._setAllMap(null);
    this._markers = [];
  };

  GoogleMap.prototype.hideFlag = function() {
    this._setAllMap(null);
  };

  GoogleMap.prototype.initialize = function() {
    this._map = new google.maps.Map(this._mapDiv, this._mapOptions);
  };

  GoogleMap.prototype.setMapDiv = function(mapDivStr) {
    var mapDiv = $(mapDivStr)[0];
    this._mapDiv = mapDiv;
  };

  GoogleMap.prototype.setMapOptions = function(mapOptions) {


    this._mapOptions = mapOptions;
  };

  GoogleMap.prototype.setTextArea = function(textStr) {
    var TextArea = $(textStr);
    this._textArea = TextArea;
  };

  GoogleMap.prototype.showFlag = function() {
    this._setAllMap(this._map);
  };

  GoogleMap.prototype.textOnChange = function() {
    var i,
    str,
    textArr;
    str = this._textArea.val();
    textArr = str.split("\n");
    i = textArr.length;
    this._goLoop(textArr, i);
  };

})(this);

(function () {
  "use strict";
  var googleMap;
  var mapOptions = [],
  TAIWAN_LAT = 23.654587852202987,
  TAIWAN_LNG = 121.014404296875,
  zoom = 8;

  mapOptions = {
    zoom: zoom,
    center: new google.maps.LatLng(TAIWAN_LAT, TAIWAN_LNG)
  };
  googleMap = new GoogleMap();

  googleMap.setMapDiv("#map-canvas");
  googleMap.setMapOptions(mapOptions);
  googleMap.setTextArea("#address");
  googleMap.initialize();

  $("#address").on("change",
    googleMap.textOnChange
  );

  $("#delete").on("click",
    googleMap.deleteFlag
  );

  $("#hide").on("click",
    googleMap.hideFlag
  );

  $("#show").on("click",
    googleMap.showFlag
  );
})();
