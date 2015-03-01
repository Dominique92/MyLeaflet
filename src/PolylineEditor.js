/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Edition d'un polyline
 *
 * N�c�ssite:
 * plugins/draw/dist/leaflet.draw-src.js
 * plugins/GeometryUtil/dist/leaflet.geometryutil.js
 * plugins/Snap/leaflet.snap.js
 *
 * Pour qu'une couche serve de r�f�rence de collage, ajouter l'option: <layer>.options.editSnapable = true
 */

L.Control.PolylineEditor = L.Control.extend({
	options: {
		position: 'topleft',
		help: ['Edit command list'], // Documentation de la liste des commandes
		idInput: 'input-editor', // id de l'imput de saisie des coordonn�es � remonter
		idChange: null, // id d'un �lement auquel appliquer display= le contenu �dit� change
		submit: '<not implemented>', // Libell� du bouton de soumission du questionnaire
	},
	changed: true,

	onAdd: function(map) {
		map.editor = this;

		// Affichage et �dition du contenu de l'input
		this.elInput = document.getElementById(this.options.idInput);
		this.elChange = document.getElementById(this.options.idChange);
		if (this.elInput) {
			var input = [];
			if (this.elInput.value) {
				this.inputValue = this.elInput.value;
				eval('input = ' + this.elInput.value);
			}
			this.type = input.type; // M�morisation pour pouvoir rendre le m�me format

			// On converti en *LineString pour pouvoir �diter les segments
			switch (input.type) {
				case 'MultiPolygon'://DCMM TODO: enlever les formats geoJSON
					var c = input.coordinates;
					input.coordinates = [];
					for (i in c)
						input.coordinates.push(c[i][0]);
				case 'Polygon':
					input.type = 'MultiLineString';
				case 'LineString':
				case 'MultiLineString':
					break;
				case undefined: // Format [[[8.857,47.851],[8.854,47.851]],[[8.856,47.852],[8.856,47.852]]]
					input = {
						type: 'MultiLineString',
						coordinates: input
					};
					break;
				default:
					alert('Type de geometrie inconnue de l\'editeur: ' + input.type);
			}
			var el = new L.GeoJSON(
				input,
				L.Polyline.prototype.options
			);
			el.addTo(map);
			this.addEdit(el);
		}

		// D�but c�ation du nouveau poly
		map.doubleClickZoom.disable();
		map.on('dblclick', function(e) {
			var draw = new L.Draw.Polyline(map, {
				shapeOptions: L.Polyline.prototype.options
			});
			draw.addHooks();
			draw.enable();
			draw._currentLatLng = L.latLng([e.latlng.lat, e.latlng.lng]);
			if (e.last)
				draw.addVertex(e.last._latlng);
			draw.addVertex(draw._currentLatLng);
		});

		// Fin cr�ation du nouveau poly
		map.on('draw:created', function(e) {
			e.layer.options.editSnapable = true;
			map.addLayer(e.layer); // On l'ajoute � la carte
			this.addEdit(e.layer); // On le rend �ditable
		}, this);

		// Cleaning des segments
		map.on('mouseup', function() {
			this.changed = true;
		}, this);
		map.on('mousemove', function() {
			if (this.changed) {
				this.changed = false;

				// Fusionne les segments ayant m�mes extr�mit�s
				for (il1 in map._layers) // Pour toutes les couches
					for (il2 in map._layers) {
						var le1 = map._layers[il1].editing,
							le2 = map._layers[il2].editing;
						if (le1 && le1._enabled && // �ditables
							le2 && le2._enabled &&
							le1._leaflet_id < le2._leaflet_id) { // 1 seule fois chaque couple
							var ll1 = le1._poly._latlngs,
								ll2 = le2._poly._latlngs,
								lladd = null; // Les points � ajouter
							if (ll1[0].equals(ll2[0])) {
								ll1.reverse();
								lladd = ll2;
							} else if (ll1[0].equals(ll2[ll2.length - 1])) {
								ll1.reverse();
								lladd = ll2.reverse();
							} else if (ll1[ll1.length - 1].equals(ll2[0])) {
								lladd = ll2;
							} else if (ll1[ll1.length - 1].equals(ll2[ll2.length - 1])) {
								lladd = ll2.reverse();
							}
							if (lladd) { // Points � fusionner
								le1._poly._latlngs.pop(); // On enl�ve le dernier point pour qu'il ne soit pas en double
								le1._poly._latlngs = ll1.concat(lladd);
								le1._poly.redraw(); // On redessine le trait
								le1.updateMarkers(); // On redessine les marqueurs
								map.removeLayer(le2._poly); // On efface l'autre polyline
							}
						}
					}
				// R�initialise snap toutes les couches "options.editSnapable" = true
				for (il1 in map._layers) {
					var le1 = map._layers[il1].editing;
					if (le1 && le1._enabled && le1._snapper) {
						le1._snapper._guides = []; // Raz
						for (il2 in map._layers) {
							var l2 = map._layers[il2];
							if (il1 != il2 && // On ne snappe pas soi m�me
								l2.options && l2.options.editSnapable)
								le1._snapper.addGuideLayer(l2);
						}
					}
				}
				// Remont�e des coordonn�es des couches �ditables dans l'input initial
				var mp = [],
					ml = [];
				for (il1 in map._layers) { // Pour toutes les couches
					var le1 = map._layers[il1].editing;
					if (le1 && le1._enabled) { // �ditables
						var g = map._layers[il1].toGeoJSON().geometry;
						switch (g.type) {
							case 'Polygon':
								ml = ml.concat(g.coordinates);
								mp.push(g.coordinates);
								break;
							case 'LineString':
								mp.push([g.coordinates]);
								ml.push(g.coordinates);
								break;
							default:
								alert('Type de geometrie inconnue dans l\'editeur: ' + g.type);
						}
					}
				}
				switch (this.type) {
					case 'Polygon':
					case 'MultiPolygon':
						ml = {
							type: 'MultiPolygon',
							coordinates: mp
						};
						break
					case 'LineString':
					case 'MultiLineString':
						ml = {
							type: 'MultiLineString',
							coordinates: ml
						};
				}
				if (this.elInput)
					this.elInput.value =
					this.elInput.innerHTML =
					JSON.stringify(ml);
				if (this.elChange &&
					(this.inputValue||'[]').trim() != this.elInput.value)
					this.elChange.style.display = '';
			}
		}, this);

		// Ic�ne du contr�le & help
		var container = L.DomUtil.create('div', 'leaflet-control-edit-help leaflet-bar');
		this.link = L.DomUtil.create('a', 'leaflet-control-edit-help-button', container);
		this.link.title = this.options.help.join('.\n') + this.options.submit+'.';
        L.DomEvent.on(this.link, 'click', function(){
			alert(this.options.help.join('.\n') + this.options.submit+'.');
		}, this);
		return container;
	},

	addEdit: function(layer) {
		// On ajoute des appels � _createMarker pour ces couches
		if (layer.editing) {
			layer.options.editing = {}; //DCMM TODO voir pourquoi (nouvelle version de draw)
			layer.editing._snapper = new L.Handler.MarkerSnap(this._map);
			layer.editing.enable();
			layer.options.editSnapable = true;
		}
		// On rend �ditables toutes les couches d�j� d�clar�es dans le contr�le
		for (l in layer._layers)
			this.addEdit(layer._layers[l]);
	}
});

L.Edit.Poly.addInitHook(function() {
	// Destruction de ligne
	this._poly.on('click', function(e) {
		var map = this._poly._map;
		if (e.target.editing._enabled) {
			e.target.options.weight = 20;
			e.target._updateStyle();
			if (confirm('Supprimer cette ligne ?')) {
				map.removeLayer(this._poly);
				map.editor.changed = true; // On peut �tre en dehors de la carte
				map.fire('mousemove');
			} else {
				e.target.options.weight = 5;
				e.target._updateStyle();
			}
		}
	}, this);
});

L.Edit.Poly.include({
	_createMarkerOrigin: L.Edit.Poly.prototype._createMarker, // M�morise la fonction d'origine
	_createMarker: function(latlng, index) {
		var map = this._poly._map,
			marker = this._createMarkerOrigin(latlng, index); // On commence par l'initialisation d'origine

		// Treat middle markers differently
		if (index === undefined) {
			// Snap middle markers, only once they were touched
			marker.on('dragstart', function() {
				this._snapper.watchMarker(marker);
			}, this);

			// D�coupe d'une ligne
			if (!this._poly._holePoints) // Sauf pour les polygones
				marker.on('click', this._onClickMiddleMarker, this);
		} else {
			this._snapper.watchMarker(marker);

			// Continuation de l'extr�mit� d'une ligne
			marker.on('click', function(e) {
				if (!e.remove && (!marker._prev || !marker._next))
					map.fire('dblclick', {
						latlng: marker._latlng,
						last: marker._prev // Une extr�mit� ou l'autre
							? (marker._prev._prev ? marker._prev : null) // Si au moins 2 segments, reprend � partir du sommet pr�c�dent (sinon, pb)
							: (marker._next._next ? marker._next : null)
					});
			});
		}
		return marker;
	},

	/* TODO: �vite le patch dans draw/leaflet.draw-src.js
	mais ne fonctionne curieusement pas :( 
		_createMiddleMarker: function(marker1, marker2) {
			var marker = this._createMarker(this._getMiddleLatLng(marker1, marker2));
			marker.setOpacity(0.6);
			marker1._middleRight = marker2._middleLeft = marker;
			this._markerGroup.addLayer(marker);
		},
	*/

	_onClickMiddleMarker: function(e) {
		// D�coupe d'une ligne
		var marker1, marker2, map = this._poly._map;
		for (m in this._markers)
			if (this._markers[m]._middleRight && this._markers[m]._middleRight._leaflet_id == e.target._leaflet_id)
				marker1 = this._markers[m];
			else if (this._markers[m]._middleLeft && this._markers[m]._middleLeft._leaflet_id == e.target._leaflet_id)
				marker2 = this._markers[m];

		if (marker1 && marker2) { // Pour les ex-milieux transform�s en sommet par drag. TODO: enlever le on quand le marqueur n'est plus un middle
			if (!marker1._prev && !marker2._next) // Il n'y a qu'un seul segment
				map.removeLayer(this._poly); // Le d�truit

			if (!marker1._prev) // C'est le premier
				this._onMarkerClick({
					target: marker1,
					remove: true // On l'enl�ve et c'est tout
				});
			else if (!marker2._next) // C'est le dernier
				this._onMarkerClick({
					target: marker2,
					remove: true // On l'enl�ve et c'est tout
				});
			else {
				var ll = [];
				for (var m = marker2; m; m = m._next) { // Pour tous les points apr�s
					ll.push([m._latlng.lat, m._latlng.lng]); // On liste
					this._onMarkerClick({
						target: m,
						remove: true // On enl�ve de ce point
					});
				}
				// Et on cree un nouveau segment �ditable
				var p = new L.Polyline(ll, this._poly.options).addTo(map);
				map.editor.addEdit(p);
			}
		}
	}
});