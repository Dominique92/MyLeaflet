var key = {
	ign: window.location.host == 'localhost'
		? 'g8jzsy4ttwzho3aepk2s4tb7' // localhost 03/12/2016 http://api.ign.fr / Votre clef de développement >>
		: 'o6owv8ubhn3vbz2uj8jq5j0z', // dominique92.github.io http://pro.ign.fr/api-web
	bing: 'ArLngay7TxiroomF7HLEXCS7kTWexf1_1s1qiF7nbTYs2IkD3XLcUnvSlKbGRZxt', // https://www.bingmapsportal.com
	os: 'CBE047F823B5E83CE0405F0ACA6042AB' // http://www.ordnancesurvey.co.uk/business-and-government/products/os-openspace/
};

var map = new L.Map('map');
map.setView([47, 2], 6); // France
L.TileLayer.collection('OSM-FR').addTo(map); // Important de le prendre dans L.TileLayer.collection pour que la première couche s'efface completement (fond et attribution)

// Controls
new L.Control.Scale().addTo(map);
new L.Control.Fullscreen().addTo(map);
new L.Control.Coordinates().addTo(map);
new L.Control.OSMGeocoder({
	position: 'topleft'
}).addTo(map);

var lc = new L.Control.Layers.overflow(L.TileLayer.collection()).addTo(map);
new L.Control.Permalink.Cookies({
	layers: lc
}).addTo(map);

new L.Control.Gps()
	.addTo(map)
	.on('gpslocated', function(e) {
		e.target._map.setView(e.latlng, 16, {
			reset: true
		});
	});

var fl = new L.Control.FileLayerLoad().addTo(map);
fl.loader.on('data:loaded', function(e) {
	e.layer.addTo(map);
}, fl);

// GeoJSON Ajax
new L.GeoJSON.Ajax.WRIpoi().addTo(map);
new L.GeoJSON.Ajax.WRImassifs().addTo(map);
new L.GeoJSON.Ajax.chemineur().addTo(map);
new L.GeoJSON.Ajax.OSM().addTo(map);
