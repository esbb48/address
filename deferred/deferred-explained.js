k = $.Deferred();
d = k.done(function() {
	return d2 = $.Deferred();
});
t= k.then(function() {
	return t2 = $.Deferred();
});
k.resolve(1);
d2.resolve(2);
t2.resolve(3);
