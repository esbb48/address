/*global  $:false,
          google:false;*/
(function () {
"use strict";
  var geocoder,
      map,
      markers = [];
      geocoder = new google.maps.Geocoder();

  function addMarker(location, title) {
    var marker,
        markerParameter = [];

    markerParameter = {
      map: map,
      position: location,
      title: title
    }
    marker = new google.maps.Marker(markerParameter);
    markers.push(marker);
  }

  function goLoop(textArr, i){
    i--;
    if(i < 0) {

    } else if(textArr[i].length <= 0){
      goLoop(textArr, i);
    } else{
      geocoder.geocode(
        {'address':textArr[i]},
        onGeocodeGet
      );

      setTimeout(function () {
        goLoop(textArr, i);
      }, 1000);

    }
  }

  function initialize() {

    var mapDiv,
        mapOptions = [],
        TAIWAN_LAT = 23.654587852202987,
        TAIWAN_LNG = 121.014404296875,
        zoom = 8;

    mapOptions = {
      zoom: zoom,
      center: new google.maps.LatLng(TAIWAN_LAT, TAIWAN_LNG)
    };

    mapDiv = $('#map-canvas')[0];
    map = new google.maps.Map(mapDiv, mapOptions);

    $("#address").on('change',
      function () {
        var i,
            str,
            textArr;

        str = $("#address").val();
        textArr = str.split('\n');
        i = textArr.length;
        goLoop(textArr, i);
      }
    );
  }

  function onGeocodeGet(results, status) {
    var LatLng;
    if(status == google.maps.GeocoderStatus.OK) {
      LatLng = results[0].geometry.location;
      map.setCenter(LatLng);  //將地圖中心定位到查詢結果
      addMarker(LatLng, results[0].formatted_address);
    }
  }

  function setAllMap(map) {
    var i = 0;
    for (i; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  $('#delete').on('click',
    function () {
      $('#hide').click();
      markers = [];
    }
  );

  $('#hide').on('click',
    function () {
      setAllMap(null);
    }
  );

  $('#show').on('click',
    function () {
      setAllMap(map);
    }
  );

  google.maps.event.addDomListener(window, 'load', initialize);

})();
