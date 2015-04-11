/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Add references to many maps vendors
 */

L.Map.maps = function(name) {
	if (typeof L.Map._maps == 'undefined') {
		L.Map._maps = {
			'Maps.Refuges.Info': L.tileLayer('http://maps.refuges.info/hiking/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a> & <a href="http://wiki.openstreetmap.org/wiki/Hiking/mri">MRI</a>'
			}),
			'Outdoors': L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a> & <a href="http://www.thunderforest.com">Thunderforest</a>'
			}),
			'OpenStreetMap': L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a>'
			}),
			'OpenStreetMap-FR': L.tileLayer('http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a>'
			}),
			'OpenCycleMap': L.tileLayer('http://a.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a> & <a href="http://www.openstreetmap.org">OpenCycleMap</a>'
			}),

			'IGN': new L.TileLayer.IGN(),
			'IGN Photo': new L.TileLayer.IGN('ORTHOIMAGERY.ORTHOPHOTOS'),
			'IGN Topo': new L.TileLayer.IGN('GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD'),
			'IGN Classique': new L.TileLayer.IGN('GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.CLASSIQUE'),
			'IGN Cadastre': new L.TileLayer.IGN('CADASTRALPARCELS.PARCELS'),

			'SwissTopo': new L.TileLayer.SwissTopo(),
			'Swiss Image': new L.TileLayer.SwissTopo('ch.swisstopo.swissimage'),
			'Swiss Siegfried': new L.TileLayer.SwissTopo('ch.swisstopo.hiks-siegfried'),
			'Swiss Dufour': new L.TileLayer.SwissTopo('ch.swisstopo.hiks-dufour'),

			'Espagne': new L.TileLayer.WMS.IDEE(),
			'Espagne photo': new L.TileLayer.WMS.IDEE.Photo(),
			'Italie': new L.TileLayer.WMS.IGM(),

			/* DCMM TODO
			'Mapbox':new L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'examples.map-i86knfo3'
			}),
			*/
			/* Russie
				'Yandex':new L.Yandex(),
				'Yandex map':new L.Yandex('map'),
				'Yandex satellite':new L.Yandex('satellite'),
				'Yandex hybrid':new L.Yandex('hybrid'),
				'Yandex publicMap':new L.Yandex('publicMap'),
				'Yandex publicMapHybrid':new L.Yandex('publicMapHybrid'),
			*/
		};
		if (typeof key != 'undefined' && typeof key.bing != 'undefined')
			L.Util.extend(L.Map._maps, {
				'Bing Road': new L.BingLayer(key.bing, {type: 'Road'}),
				'Bing Photo': new L.BingLayer(key.bing), // Idem type:'Aerial'
				'Bing Hybrid': new L.BingLayer(key.bing, {type: 'AerialWithLabels'}),
			});
		if (typeof google != 'undefined') // Si le script de déclaration de l'API a été inclus)
			L.Util.extend(L.Map._maps, {
				'Google Road': new L.Google('ROADMAP'),
				'Google Terrain': new L.Google('TERRAIN'),
				'Google Photo': new L.Google(), // Idem 'SATELLITE'
				'Google Hybrid': new L.Google('HYBRID')
			});
	}
	return typeof L.Map._maps[name] != 'undefined'
		? L.Map._maps[name]
		: L.Map._maps;
}
