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

    $.getJSON(base)
        .done(function(data) {
            console.log(data);
            goLoop(data);
        });

    function goLoop(data) {
        if ( j < 10) {
            j++;
            $.getJSON(base + "?id=" + data.number)
            .done(function(data){
                console.log(data);
                goLoop(data);
            })
            .fail(function(data){
                alert('fail');
            });
        }
    }

})(this);
