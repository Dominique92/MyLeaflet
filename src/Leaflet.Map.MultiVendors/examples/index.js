var map = new L.Map('map', {
	center: new L.LatLng(47, 2), // Centre France
	zoom: 6,
	layers: [L.TileLayer.collection('OSM-FR')]
});

new L.Control.Layers(L.TileLayer.collection()).addTo(map);

L.OSOpenSpace.TileLayer.prototype.options.crs = L.OSOpenSpace.CRS; // Assign CRS to OS-UK layer options
