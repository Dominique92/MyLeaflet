/*
 * Copyright (c) 2014 Dominique Cavailhez
 * OSM maps
 * Instances of the WMS class allow viewing maps inherited from the OpenStreetMap databases
 * (c) https://www.openstreetmap.org
 */

L.TileLayer.OSM = L.TileLayer.extend({
	options: {
		url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	},

	initialize: function(options) {
		L.setOptions(this, options);
		this.options.attribution =
			'&copy; <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a>' +
			(this.options.attribution ? '/' : '') + this.options.attribution;
		L.TileLayer.prototype.initialize.call(this, this.options.url);
	}
});

L.TileLayer.OSM.FR = L.TileLayer.OSM.extend({
	options: {
		url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
	}
});

L.TileLayer.OSM.MRI = L.TileLayer.OSM.extend({
	options: {
		url: 'http://maps.refuges.info/hiking/{z}/{x}/{y}.png',
		attribution: '<a href="http://wiki.openstreetmap.org/wiki/Hiking/mri">MRI</a>'
	}
});

L.TileLayer.OSM.OB = L.TileLayer.OSM.extend({
	options: {
		url: 'http://ec{s}.cdn.ecmaps.de/WmsGateway.ashx.jpg?Experience=kompass&MapStyle=KOMPASS OSM&TileX={x}&TileY={y}&ZoomLevel={z}',
		maxZoom: 15,
		subdomains: '0123'
	}
});

L.TileLayer.OSM.OB.Touristik = L.TileLayer.OSM.OB.extend({
	options: {
		url: 'http://ec{s}.cdn.ecmaps.de/WmsGateway.ashx.jpg?Experience=kompass&MapStyle=KOMPASS Touristik&TileX={x}&TileY={y}&ZoomLevel={z}'
	}
});

L.TileLayer.OSM.hikebike = L.TileLayer.OSM.extend({
	options: {
		url: 'http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
		subdomains: 'abc',
		maxZoom: 20,
		attribution: '<a href="http://www.hikebikemap.org/">hikebikemap.org</a>'
	}
});

L.TileLayer.OSM.hill = L.TileLayer.OSM.extend({
	options: {
		url: 'http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
		subdomains: 'abc',
		maxZoom: 15,
		attribution: '<a href="https://wikitech.wikimedia.org">Wikimedia Tool Labs</a>'
	}
});

// Cartes ThunderForest
var ft = ['Landscape', 'Outdoors', 'Cycle', 'Transport'];
for (m in ft)
	L.TileLayer.OSM[ft[m]] = L.TileLayer.OSM.extend({
		options: {
			url: 'http://{s}.tile.thunderforest.com/' + ft[m].toLowerCase() + '/{z}/{x}/{y}.png',
			attribution: '<a href="http://www.thunderforest.com">Thunderforest ' + ft[m] + '</a>'
		}
	});