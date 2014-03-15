(function(global, undefined) {
    "use strict";

    // var locations,
    //     users;

    // users = [
    //     1,
    //     2,
    //     3
    // ];

    // locations = users.map(function(user) {
    //     return "/address/deferred/data.php?id=" + user;
    // });

    // // console.log(locations);

    // var base = "/address/deferred/data.php";
    // var deferred;
    // var j = 1;
    // var thenResult;

    // deferred = $.getJSON(base)
    //     .then(function(data) {
    //         console.log(data);
    //          return $.getJSON(base + "?id=" + data.number);
    //     });

    function doneFilter(){
        alert("done");
    }

    function failFilter(){
        alert("fail");
    }

    function progressFilter(){
        alert("progress");
    }

    function then(deferred, doneFilter, failFilter, progressFilter) {
        var tempDeferred;
        tempDeferred = deferred.done(doneFilter)
                        .fail(failFilter)
                        .progress(progressFilter);

        return tempDeferred;
    }

      var head;

      // head = jQuery.Deferred().resolve();
      head = jQuery.Deferred().reject();
      head = then(head, doneFilter, failFilter, progressFilter);
      head = then(head, doneFilter, failFilter, progressFilter);
      head = then(head, doneFilter, failFilter, progressFilter);

})(this);
