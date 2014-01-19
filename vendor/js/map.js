/*global  $:false,
          google:false;*/
(function () {
"use strict";
  var geocoder,
      googleMap;

      geocoder = new google.maps.Geocoder();
      googleMap = new GoogleMap();

  function GoogleMap() {
    var _map,
        _markers = [];

    this.addMarker = function(location, title) {
      var marker,
          markerParameter = [];

      markerParameter = {
        map: _map,
        position: location,
        title: title
      };

      marker = new google.maps.Marker(markerParameter);
      _markers.push(marker);
    };

    this.getMap = function () {
      return _map;
    };

    this.getMarkers = function () {
      return _markers;
    };

    this.goLoop = function(textArr, i){
      i--;
      if (i < 0) {

      } else if (textArr[i].length <= 0){
        googleMap.goLoop(textArr, i);
      } else {
        geocoder.geocode(
          {"address":textArr[i]},
          googleMap.onGeocodeGet
        );

        setTimeout(function () {
          googleMap.goLoop(textArr, i);
        }, 1000);
      }
    };

    this.initialize = function() {
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
        _map = new google.maps.Map(mapDiv, mapOptions);

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

    this.onGeocodeGet = function(results, status) {
      var address,
          LatLng;
      if (status == google.maps.GeocoderStatus.OK) {
        address = results[0].formatted_address;
        LatLng = results[0].geometry.location;
        _map.setCenter(LatLng);  //將地圖中心定位到查詢結果
        googleMap.addMarker(LatLng, address);
      }
    };

    this.setAllMap = function(factor) {
      var i = 0;
      for (i; i < _markers.length; i++) {
        _markers[i].setMap(factor);
      }
    };

    this.setMapValue = function (factor) {
      _map = factor;
    };

    this.setMarkers = function (factor) {
      _markers = factor;
    };

  }

  $("#delete").on("click",
    function () {
      googleMap.setAllMap(null)
              .setMarkers([]);
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
      map = googleMap.getMap();
      googleMap.setAllMap(map);
    }
  );

  google.maps.event.addDomListener(window, "load", googleMap.initialize);

})();
