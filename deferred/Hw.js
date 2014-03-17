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
		return $.Deferred();
    }

    function failFilter(){
		return  $.Deferred();
    }

    function progressFilter(){
		return $.Deferred();
    }

    function then(deferred, doneFilter, failFilter, progressFilter) {
        var NewDefferred,
            State;
		deferred.done(doneFilter)
                .fail(failFilter)
                .progress(progressFilter);
        State = deferred.state();

        if(State == "resolved") {
            temp = doneFilter();
        } else if (State == "rejected") {
            temp = failFilter();
        } else if (State == "pending"){
            temp = progressFilter();
        }
        NewDefferred = temp.done(function(){});
        return NewDefferred;
    }

    var head,
        t,
        temp;

    head = $.Deferred();
    t = then(head, doneFilter, failFilter, progressFilter);
    debugger;
    // head = then(head, doneFilter, failFilter, progressFilter);
    // head = then(head, doneFilter, failFilter, progressFilter);

})(this);
