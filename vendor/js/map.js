/*global $:false, google:false */
/*jshint camelcase:true, curly:true, eqeqeq:true, freeze:true, immed:true,
 indent:2, newcap:true, noarg:true, noempty:true, nonew:true, quotmark:double,
 undef:true, unused:true, strict:true, trailing:true */
(function(global, undefined) {
  "use strict";

  global.GoogleMap = GoogleMap;

  Function.prototype.bind2 = function(context) {
    var f = this;
    return function() {
      f.apply(context,arguments);
    };
  };

  function GoogleMap() {
    this._geocoder = new google.maps.Geocoder();
    this._map = null;
    this._markers = [];
    this.goLoop = this.goLoop.bind2(this);
    this.initialize = this.initialize.bind2(this);
    this.onGeocodeGet = this.onGeocodeGet.bind2(this);
    this.onTimeout = this.onTimeout.bind2(this);
  }

  GoogleMap.prototype.addMarker = function(location, title) {
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

  GoogleMap.prototype.goLoop = function(textArr, i){
    i--;
    var tempF = this.onTimeout.bind2(this);
    if (i < 0) {

    } else if (textArr[i].length <= 0){
      this.goLoop(textArr, i);
    } else {
      this._geocoder.geocode(
        {"address":textArr[i]},
        this.onGeocodeGet
      );
      setTimeout(tempF(textArr, i), 1000);
    }
  };

  GoogleMap.prototype.initialize = function() {
    var mapDiv,
      mapOptions = [],
      TAIWAN_LAT = 23.654587852202987,
      TAIWAN_LNG = 121.014404296875,
      zoom = 8;

      mapOptions = {
        zoom: zoom,
        center: new google.maps.LatLng(TAIWAN_LAT, TAIWAN_LNG)
      };

      mapDiv = $("#map-canvas")[0];
      this._map = new google.maps.Map(mapDiv, mapOptions);


  };

  GoogleMap.prototype.onGeocodeGet = function(results, status) {
    var address,
        LatLng;
    if (status == google.maps.GeocoderStatus.OK) {
      address = results[0].formatted_address;
      LatLng = results[0].geometry.location;
      this._map.setCenter(LatLng);  //將地圖中心定位到查詢結果
      this.addMarker(LatLng, address);
    }
  };

  GoogleMap.prototype.onTimeout = function(textArr, i) {
    this.goLoop(textArr, i);
  };

  GoogleMap.prototype.setAllMap = function(factor) {
    var i = 0;
    for (i; i < googleMap._markers.length; i++) {
      this._markers[i].setMap(factor);
    }
  };

})(this);

(function () {
"use strict";
  var googleMap;
      googleMap = new GoogleMap();

  $("#address").on("change",
      function () {
        var i,
            str,
            textArr;

        str = $("#address").val();
        textArr = str.split("\n");
        i = textArr.length;
        googleMap.goLoop(textArr, i);
      }
    );

  $("#delete").on("click",
    function () {
      googleMap.setAllMap(null);
      googleMap._markers = [];
    }
  );

  $("#hide").on("click",
    function () {
      googleMap.setAllMap(null);
    }
  );

  $("#show").on("click",
    function () {
      var map;
      map = googleMap._map;
      googleMap.setAllMap(map);
    }
  );

  google.maps.event.addDomListener(window, "load", googleMap.initialize);

})();
