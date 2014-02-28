/*global  $:false,
          google:false;*/
(function(global, undefined) {
  "use strict";

  global.GoogleMap = GoogleMap;



  function GoogleMap() {
    this._geocoder = new google.maps.Geocoder();
    this._map = null;
    this._markers = [];
  }

  GoogleMap.prototype.addMarker = function(location, title) {
    var marker,
        markerParameter = [];

    markerParameter = {
      map: googleMap._map,
      position: location,
      title: title
    };

    marker = new google.maps.Marker(markerParameter);
    googleMap._markers.push(marker);
  };

  GoogleMap.prototype.goLoop = function(textArr, i){
    i--;
    if (i < 0) {

    } else if (textArr[i].length <= 0){
      googleMap.goLoop(textArr, i);
    } else {
      googleMap._geocoder.geocode(
        {"address":textArr[i]},
        googleMap.onGeocodeGet
      );

      setTimeout(function () {
        googleMap.goLoop(textArr, i);
      }, 1000);
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
      googleMap._map = new google.maps.Map(mapDiv, mapOptions);

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
  };

  GoogleMap.prototype.onGeocodeGet = function(results, status) {
    var address,
        LatLng;
    if (status == google.maps.GeocoderStatus.OK) {
      address = results[0].formatted_address;
      LatLng = results[0].geometry.location;
      googleMap._map.setCenter(LatLng);  //將地圖中心定位到查詢結果
      googleMap.addMarker(LatLng, address);
    }
  };

  GoogleMap.prototype.setAllMap = function(factor) {
    var i = 0;
    for (i; i < googleMap._markers.length; i++) {
      googleMap._markers[i].setMap(factor);
    }
  };
})(this);

(function () {
"use strict";
  var googleMap;
      googleMap = new GoogleMap();

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
$.ajax(location + "", {
  context: "asdf",
  success: function() {
    console.log(this)
  }
});
})();
