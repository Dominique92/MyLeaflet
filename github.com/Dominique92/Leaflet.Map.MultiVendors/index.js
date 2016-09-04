// Specific layers keys
var key = {
	ign: window.location.host == 'localhost'
		? 'g8jzsy4ttwzho3aepk2s4tb7' // localhost 03/12/2016 http://api.ign.fr / Votre clef de développement >>
		: 'o6owv8ubhn3vbz2uj8jq5j0z', // dominique92.github.io http://pro.ign.fr/api-web
	bing: 'ArLngay7TxiroomF7HLEXCS7kTWexf1_1s1qiF7nbTYs2IkD3XLcUnvSlKbGRZxt', // https://www.bingmapsportal.com
	os: 'CBE047F823B5E83CE0405F0ACA6042AB' // http://www.ordnancesurvey.co.uk/business-and-government/products/os-openspace/
};

var map = new L.Map('map', {
	center: new L.LatLng(47, 2), // Centre France
	zoom: 6,
	layers: [L.TileLayer.collection('OSM-FR')]
});

new L.Control.Layers(L.TileLayer.collection()).addTo(map);
