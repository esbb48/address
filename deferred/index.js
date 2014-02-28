(function(global, undefined) {
    "use strict";

    var locations,
        users;

    users = [
        1,
        2,
        3
    ];

    locations = users.map(function(user) {
        return "/deferred/data.php?id=" + user;
    });

    console.log(locations);

    var base = "/deferred/data.php";
    var deferred;

    $.ajax({
        success: function() {
            console.log("b");
        }
    });
    console.log("a");

    //$.getJSON(base, function(data) {
        //console.log(data);
        //$.getJSON(base + "?id=" + data.number, function(data) {
            //console.log(data);
            //$.getJSON(base + "?id=" + data.number, function(data) {
                //console.log(data);
            //});
        //});
    //});

    //$.getJSON(base, function(data) {
        //console.log(data);
    //});
    //$.getJSON(base + "?id=" + data.number, function(data) {
        //console.log(data);
    //});
    //$.getJSON(base + "?id=" + data.number, function(data) {
        //console.log(data);
    //});

    //deferred = $.getJSON(base);
    //deferred = deferred.then(function(data) {
        //return $.getJSON(base + "?id=" + data.number);
    //});
    //deferred = deferred.then(function(data) {
        //return $.getJSON(base + "?id=" + data.number);
    //});
    //deferred.done(function(data) {
        //console.log(data);
    //});

    $.getJSON(base)
        .then(function(data) {
            console.log(data);
            return $.getJSON(base + "?id=" + data.number);
        })
        .then(function(data) {
            console.log(data);
            return $.getJSON(base + "?id=" + data.number);
        })
        .done(function(data) {
            console.log(data);
        });
})(this);
