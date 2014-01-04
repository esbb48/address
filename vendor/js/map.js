(function () {
  var map,
      markers = [];

  function addMarker(location, title) {
    var marker;
    marker = new google.maps.Marker({
      map: map,
      position: location,
      title: title
    });
    markers.push(marker);
  }

  function initialize() {

    var mapOptions = [],
        Taiwan_lat = 23.654587852202987,
        Taiwan_lng = 121.014404296875,
        zoom = 8;

    mapOptions = {
      zoom: zoom,
      center: new google.maps.LatLng(Taiwan_lat, Taiwan_lng)
    };
    map = new google.maps.Map($('#map-canvas')[0], mapOptions);

    $("#address").on('change',function(){
      var geocoder,
          i,
          LatLng,
          str,
          TextArr;

      geocoder = new google.maps.Geocoder();
      str = $(this).val();
      TextArr = str.split('\n');

      for (i = TextArr.length - 1; i >= 0; i--) {

        if(TextArr[i].length <= 0){
          continue;
        }

        geocoder.geocode(
          {'address':TextArr[i]},
          onGeocodeGet
        );

      };
    });
  }

  function onGeocodeGet(results, status) {
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

  $('#delete').on('click',function() {
    $('#hide').click();
    markers = [];
  });

  $('#hide').on('click',function() {
    setAllMap(null);
  });

  $('#show').on('click',function() {
    setAllMap(map);
  });

  google.maps.event.addDomListener(window, 'load', initialize);

})();
