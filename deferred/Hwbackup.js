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
        return "/address/deferred/data.php?id=" + user;
    });

    console.log(locations);

    var base = "/address/deferred/data.php";
    var deferred;
    var j = 1;
    var thenResult;

    deferred = $.getJSON(base)
        .then(function(data) {
            console.log(data);
             return $.getJSON(base + "?id=" + data.number);
        });

    function doneFilter(){
        alert('done');
    }

    function failFilter(){
        alert('fail');
    }

    function progressFilter(){
        alert('progress');
    }

    function then(deferred, doneFilter, failFilter, progressFilter) {
        var tempDeferred;
        tempDeferred = new jQuery.Deferred();
        tempDeferred.done = doneFilter;
        tempDeferred.fail = failFilter;
        tempDeferred.progress = progressFilter;
        tempDeferred.then = deferred;
        return tempDeferred;
    }

    thenResult = then(deferred, doneFilter, failFilter, progressFilter);
    debugger;

    // function goLoop(data) {
    //     if ( j < 10) {
    //         j++;
    //         $.getJSON(base + "?id=" + data.number)
    //         .done(function(data){
    //             console.log(data);
    //             goLoop(data);
    //         })
    //         .fail(function(data){
    //             alert('fail');
    //         });
    //     }
    // }

})(this);
