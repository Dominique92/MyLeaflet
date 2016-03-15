var map = new L.Map('map');
map.setView([45.18, 5.7], 12);

// Baselayer
var baselayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
});
baselayer.addTo(map);

new L.Control.Permalink.Cookies({ // shramov/leaflet-plugins
//	layers: baselayer
}).addTo(map);