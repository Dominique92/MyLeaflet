window.addEventListener('load', function() {
	var map = L.map('map').setView([45, 5], 7);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>; contributors'
	}).addTo(map);

	var editor = new L.Control.Draw.Plus({
		draw: {
			marker: true,
			polyline: true,
			polygon: true
		},
		edit: {
			remove: true
		}
	}).addTo(map);

	// Initialisation des couches éditables avec le contenu du champ en entrée
	var ljs = new L.GeoJSON(JSON.parse(document.getElementById('entree').innerHTML));
	for (var l in ljs._layers)
		ljs._layers[l].addTo(editor);

	// Restitution des couches éditables dans le champ en sortie
	map.on('draw:edited', function() {
		document.getElementById('entree').innerHTML = JSON.stringify(editor.editLayers.toGeoJSON());
		document.getElementById('change').style.display = '';
	});

	// File loader
	var fl = new L.Control.FileLayerLoad().addTo(map);
	fl.loader.on('data:loaded', function(e) {
		e.layer.addTo(editor);
	}, fl);
});