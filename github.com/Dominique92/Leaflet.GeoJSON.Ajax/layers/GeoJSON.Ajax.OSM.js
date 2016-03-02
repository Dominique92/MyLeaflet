/*
 * Copyright (c) 2016 Dominique Cavailhez
 * https://github.com/Dominique92
 * Supported both on Leaflet V0.7 & V1.0
 *
 * Ajax layers to access OpenStreetMap Overpass API http://wiki.openstreetmap.org/wiki/Overpass_API
 * Based on L.GeoJSON and L.GeoJSON.Ajax
 * With the great initial push from https://github.com/sletuffe
 */

L.GeoJSON.Ajax.OSM = L.GeoJSON.Ajax.extend({
	options: {
		urlGeoJSON: 'http://overpass-api.de/api/interpreter',
		bbox: true,
		maxLatAperture: 0.25, // (Latitude degrees) The layer will only be displayed if it's zooms to less than this latitude aperture degrees.
		timeout: 25, // Server timeout (seconds)
		services: {}, // Request data formating
		icons: {}, // Icons name translation
		language: {}, // label word translation

		// Url args calculation
		argsGeoJSON: function() {
			// Select services using html form
			// <input type="checkbox" name="osm-categories[]" value="shop~supermarket|convenience" />
			var st = document.getElementsByName('osm-categories[]');
			if (st.length) {
				this.options.services = {};
				for (var e = 0; e < st.length; e++)
					if (st[e].checked) {
						var val = st[e].value.split('~');
						if (typeof this.options.services[val[0]] == 'undefined')
							this.options.services[val[0]] = val[1];
						else
							this.options.services[val[0]] += '|' + val[1];
					}
			}

			// No selection ?
			this.options.disabled = !Object.keys(this.options.services).length;

			// Build the request
			var r = '[out:json][timeout:' + this.options.timeout + '];(\n',
				b = this._map.getBounds(),
				bbox = b._southWest.lat + ',' + b._southWest.lng + ',' + b._northEast.lat + ',' + b._northEast.lng;
			for (var s in this.options.services) {
				var x = '["' + s + '"~"' + this.options.services[s] + '"](' + bbox + ');\n';
				r += 'node' + x + 'way' + x;
			}
			return {
				data: r + ');out center;>;'
			};
		}
	},

	// Label data formating
	label: function(data) {
		var t = data.tags;
		return {
			name: '<b>' + t.name + '</b>',
			description: [
				data.type,
				'*'.repeat(t.stars),
				t.rooms ? t.rooms + ' rooms' : '',
				t.place ? t.place + ' places' : '',
				t.capacity ? t.capacity + ' places' : '',
				'<a href="http://www.openstreetmap.org/' + (data.center ? 'way' : 'node') + '/' + data.id + '">&copy;</a>'
			],
			phone: '<a href="tel:'+t.phone.replace(/[^0-9\+]+/ig, '')+'">'+t.phone+'</a>',
			email: '<a href="mailto:' + t.email + '">' + t.email + '</a>',
			address: [
				t['addr:housenumber'],
				t['addr:street'],
				t['addr:postcode'],
				t['addr:city']
			],
			website: '<a href="' + t.website + '>' + t.website + '</a>'
		};
	},

	// Convert received data in geoJson format
	_tradJson: function(data) {
		if (data.remark)
			this.elAjaxStatus.className = 'ajax-zoom';

		var geoJson = []; // Prepare geoJson object for Leaflet.GeoJSON display
		for (var e in data.elements) {
			var d = data.elements[e],
				t = d.tags,
				icon = null;

			// Find the right icon using services & icon options
			for (s in this.options.services)
				if (typeof t[s] == 'string' &&
					this.options.services[s].search(t[s]) != -1) {
					d.type = t[s];
					icon = this.options.icons[t[s]] || t[s];
				}
			// Label text calculation
			if (!t.phone)
				t.phone = t['contact:phone'] || '';
			delete t['contact:phone'];

			// Add sheme to website if necessary
			if (t.website && t.website.search('http'))
				t.website = 'http://' + t.website;

			var label = this.label (d);
			if (typeof this.options.label == 'function')
				label = this.options.label (d, label);

			var language = this.options.language, // Need this for local usage in function(m)
				description = label.description.join(' ')
				.replace( // Word translation if necessary
					new RegExp(Object.keys(language).join('|'), 'gi'),
					function(m) {
						return language[m.toLowerCase()];
					}
				),
				popup = [
					t.name ? label.name : '',
					description.charAt(0).toUpperCase() + description.substr(1), // Uppercase the first letter
					t.ele ? label.altitude : '',
					t.phone ? label.phone : '',
					t.email ? label.email : '',
					t['addr:street'] ? label.address.join(' ') : '',
					t.website ? label.website : ''
				];

			if (d.center) // When item has a geometry, we need to get the center
				Object.assign(d, d.center);

			if (d.type && d.lon && d.lat)
				geoJson.push({
					type: 'Feature',
					id: d.id,
					properties: {
						icon: icon,
						title: '<p>' + popup.join('</p><p>') + '</p>'
					},
					geometry: {
						type: 'Point',
						coordinates: [d.lon, d.lat]
					}
				});
		}
		return geoJson;
	},

	error429: function() { // Too many requests or request timed out
		this.elAjaxStatus.className = 'ajax-zoom';
	},

	error504: function() { // Gateway request timed out
		this.elAjaxStatus.className = 'ajax-zoom';
	}
});