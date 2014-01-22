var bird,
	bird2;

// Approach one
function Bird() {}
Bird.prototype.fly = function() {};

bird = new Bird();
bird2 = new Bird();

// Approach two
function clone(origin) {
	var clone;

	for (thing in origin) {
		clone[thing] = origin[thing];
	}

	return clone;
}

bird = {
	fly: function() {}
};
bird2 = clone(bird);

// Approach three
function clone(origin) {
	var temp = function() {};

	temp.prototype = origin;

	return new temp();
}

bird = {
	fly: function() {}
};
bird2 = clone(bird);

bird.fly();
bird2.fly();

// separator

// Case One
bird = {
	fly: function() {
		console.log(this === bird);
	}
};
bird.fly();

// Case Two: global object
function fly() {
	console.log(this === window);
}
fly();

// Case Three
function fly() {
	"use strict";
	console.log(this);
}
fly();

// Case Four
function fly() {
	"use strict";
	console.log(this === bird);
}
var bird = {};
bird.fly = fly;
bird.fly();

// Case Five
bird = {
	fly: function() {
		"use strict";
		console.log(this === undefined);
	}
};
fly = bird.fly;
fly();

// Case Six
bird = {
	fly: function() {
		"use strict";
		console.log(this === bird2);
	}
};
bird2 = {};
bird2.fly = bird.fly;
bird2.fly();

(function () {
	"use strict";
})();

// separator

var k = 4;
window.k === 4;

// separator

(function() {
	var k;
})();

k();

// separator

function f() {
	"use strict";
	console.log(this === window);
}
//f.prototype
//f.call
//f.apply
f(1, 2, 3);
f.call(window, 1, 2, 3);
f.apply(window, [1, 2, 3]);
bird.f();
bird.fly.call();

function f()
{
	g.apply(window, arguments);
}

function g(one, two, three)
{
	console.log(one, two, three);
}

f(3, 2, 1);

Array.prototype.slice === [].slice;
(function(){return arguments.slice})();
[1, 2, 3].slice();
(function(){return [].slice.call(arguments)})();
