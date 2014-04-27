(function(global, undefined) {
    "use strict";


    function doneFilter(){
        alert('done');
    }

    function failFilter(){
        alert('fail');
    }

    function progressFilter(){
        alert('progress');
    }

    function then(OriginDeferred, doneFilter, failFilter, progressFilter) {
        var NewDeferred;
        NewDeferred = new jQuery.Deferred();

        //First
        // OriginDeferred.done(function(){
        //         doneFilter.apply(this, arguments);
        //         NewDeferred.resolve();
        //     });

        // OriginDeferred.fail(function(){
        //         failFilter.apply(this, arguments);
        //         NewDeferred.reject();
        //     });

        // OriginDeferred.progress(function(){
        //         progressFilter.apply(this, arguments);
        //         NewDeferred.notify();
        //     });

        //Second
         // OriginDeferred.done(doneFilter);
         // OriginDeferred.done(NewDeferred.resolve);

         // OriginDeferred.fail(failFilter);
         // OriginDeferred.fail(NewDeferred.reject);

         // OriginDeferred.progress(progressFilter);
         // OriginDeferred.progress(NewDeferred.notify);

         //Three
        OriginDeferred.done(doneFilter)
                    .done(NewDeferred.resolve)
                    .fail(failFilter)
                    .fail(NewDeferred.reject)
                    .progress(progressFilter)
                    .progress(NewDeferred.notify);

        return NewDeferred;
    }

    var NewDeferred;
    var OriginDeferred;
    OriginDeferred = new jQuery.Deferred();
    NewDeferred = then(OriginDeferred, doneFilter, failFilter, progressFilter);

    debugger;
})(this);
