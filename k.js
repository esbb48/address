// assume addresses are all valid addresses
function getLatLng(addresses) {
	var deferreds = [],
		latLngs = [],
		result = $.Deferred();

	deferreds[0] = $.Deferred().resolve();

	for (
		addressIndex = 0;
		addressIndex < addresss.length;
		addressIndex++
	) {
		deferreds[addressIndex + 1] = $.Deferred();
		onDeferredResolve = onDeferredResolveCreator(
			addresses[addressIndex],
			deferreds[addressIndex + 1],
			latLngs
		);
		deferreds[addressIndex].done(onDeferredResolve);
	}

	deferreds[addresses.length].done(function() {
		result.resolve(latLngs);
	});

	return result;
}

function onDeferredResolveCreator(address, deferred, latLngs) {
	return function() {
		geocoder.geocode(
			{
				"address": address
			},
			function() {
				deferred.resolve();
				latLngs.push(arguments);
			}
		);
	};
}
