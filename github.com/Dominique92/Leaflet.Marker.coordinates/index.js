map = L.map('map');

new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Frame fixe marquant une position. La carte est centrée autour
frame = new L.Marker([45.78, 3.08], { // Position par défaut
		clickable: false, // Evite d'activer le viewfinder: curseur
		icon: L.icon({
			iconUrl: 'images/frame.png',
			iconAnchor: [15, 21]
		})
	})
	.coordinates('position') // Affiche les coordonnées
	.addTo(map);
// Recentre la carte sur ce frame
map.setView(frame._latlng, 6, {
	reset: true
});

// viewfinder déplaçable affichant sa position éditable.
viewfinder = new L.Marker([45.78, 3.08], {
		draggable: true,
		icon: L.icon({
			iconUrl: 'images/viewfinder.png',
			iconAnchor: [15, 15]
		})
	})
	.coordinates('viewfinder') // Affiche / saisi les coordonnées
	.addTo(map);
