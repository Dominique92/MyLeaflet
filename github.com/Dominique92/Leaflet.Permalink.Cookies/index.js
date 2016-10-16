var map = new L.Map('map');
map.setView([45.18, 5.7], 12);

// Baselayers
var baselayers = {
	'OSM': new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
	}),
	'OSM-FR': new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
	})
}
baselayers.OSM.addTo(map);

new L.Control.Layers(baselayers).addTo(map);

new L.Control.Permalink.Cookies({ // shramov/leaflet-plugins
//	layers: baselayer
}).addTo(map);