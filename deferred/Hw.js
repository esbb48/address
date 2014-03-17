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
        //alert("done");
		return $.Deferred();
		//return $.Deferred.Deferred();
    }

    function failFilter(){
        //alert("fail");
		return $.Deferred();
    }

    function progressFilter(){
        //alert("progress");
		return $.Deferred();
    }

    function then(deferred, doneFilter, failFilter, progressFilter) {
        var NewDeferred = $.Deferred();
		var tempDeferred,
			tempState;

		//deferred.done(doneFilter)
          //      .fail(failFilter)
            //    .progress(progressFilter);

		var state = deferred.state();
		if(state == "resolved") {
			tempDeferred == doneFilter();
		} elseif (state == "rejected") {
			tempDeferred == failFilter();
		} elseif (state == "pending"){
			tempDeferred == progressFilter();
		}

		tempState = tempDeferred.state();
		if(tempState == "resolved") {
			NewDeferred.resolve();
		} elseif (state == "rejected") {
			NewDeferred.reject();
		} elseif (state == "pending"){
			NewDeferred.notify();
		}

        return NewDeferred;
    }

      var head;

      // head = jQuery.Deferred().resolve();
      head = jQuery.Deferred().reject();
      head = then(head, doneFilter, failFilter, progressFilter);
      head = then(head, doneFilter, failFilter, progressFilter);
      head = then(head, doneFilter, failFilter, progressFilter);

})(this);
