/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Markers, polylines, polygons, rectangles & circle editor
 * Slice polylines
 * Polygon to polyline switch
 * Stick on other vectors layers
 * Needs http://github.com/Leaflet/Leaflet.draw and http://github.com/makinacorpus/Leaflet.Snap
 */

// New texts associated to the new switch control
L.drawLocal.edit.toolbar.buttons.switchpoly = 'Switch Poly type.';
L.drawLocal.edit.handlers.switchpoly = {
	tooltip: {
		text: 'Click on a Polygon to make a Polyline and vice versa'
	}
};

// Slice a polyline
L.Edit.Poly.include({
	_onClick: function(e) {
		var marker1, marker2;
		for (m in this._markers)
			if (this._markers[m]._middleRight && this._markers[m]._middleRight._leaflet_id == e.target._leaflet_id)
				marker1 = this._markers[m];
			else if (this._markers[m]._middleLeft && this._markers[m]._middleLeft._leaflet_id == e.target._leaflet_id)
				marker2 = this._markers[m];

		if (marker1 && marker2) {
			if (!marker1._prev && !marker2._next) // There is only 1 segment
				this._poly._map.removeLayer(this._poly); // Destroy the polyline

			if (!marker1._prev) // This is the first segment
				this._onMarkerClick({
				target: marker1,
				remove: true // Just remove it
			});
			else if (!marker2._next) // This is the last segment
				this._onMarkerClick({
				target: marker2,
				remove: true // Just remove it
			});
			else {
				var ll = [];
				for (var m = marker2; m; m = m._next) { // Remove all the summits after the cut
					ll.push([m._latlng.lat, m._latlng.lng]);
					this._onMarkerClick({
						target: m,
						remove: true
					});
				}
				// And reuse them to create a new polyline
				this._poly._map.fire('draw:created', {
					layer: new L.Polyline(ll, this._poly.options)
				});
			}
		}
		this._poly._map.fire('draw:edited');
	}
});

// Add the switch control to the edit bar
L.EditToolbar.include({
	getModeHandlersNative: L.EditToolbar.prototype.getModeHandlers,

	getModeHandlers: function(map) {
		return [{
			enabled: this.options.switchpoly,
			handler: new L.EditToolbar.SwitchPoly(map, {
				featureGroup: this.options.featureGroup
			}),
			title: L.drawLocal.edit.toolbar.buttons.switchpoly
		}].concat(L.EditToolbar.prototype.getModeHandlersNative.call(this, map));
	}
});

// Create the switch control
L.EditToolbar.SwitchPoly = L.EditToolbar.Delete.extend({
	statics: {
		TYPE: 'switchpoly' // not delete as delete is reserved in js
	},

	initialize: function(map, options) {
		L.EditToolbar.Delete.prototype.initialize.call(this, map, options);
		this.type = L.EditToolbar.Edit.TYPE;
	},

	addHooks: function() {
		L.EditToolbar.Delete.prototype.addHooks.call(this);
		if (this._map)
			this._tooltip.updateContent({
				text: L.drawLocal.edit.handlers.switchpoly.tooltip.text
			});
	},

	revertLayers: function() {}, // Cancel does'nt work well

	_removeLayer: function(e) {
		this._map.fire('draw:created', { // Then, we recreate the layout with another type
			layer:
				e.target.options.fill
					? new L.Polyline(e.target._latlngs)
					: new L.Polygon(e.target._latlngs)
		});

		L.EditToolbar.Delete.prototype._removeLayer.call(this, e);
	},
});

L.Control.Draw.Plus = L.Control.Draw.extend({

	snapLayers: L.featureGroup(), // Container of layers used for snap
	editLayers: L.featureGroup(), // Container of editable layers

	options: {
		draw: {
			marker: false,
			polyline: false,
			polygon: false,
			rectangle: false,
			circle: false
		},
		edit: {
			edit: false,
			switchpoly: false
		}
	},

	initialize: function (options) {
		options.edit = L.extend(this.options.edit, options.edit); // Mark false non choisen options
		options.draw = L.extend(this.options.draw, options.draw);
		for (o in options.draw)
			if (options.draw[o])
				options.draw[o] = {guideLayers: [this.snapLayers]}; // Allow snap on creating elements

		L.Control.Draw.prototype.initialize.call(this, options);
	},

	onAdd: function (map) {
		this._toolbars.edit.options.featureGroup =
			this.editLayers.addTo(
				this.snapLayers.addTo(map)
			);

		// Add a new feature
		map.on('draw:created', function(e) {
			e.layer.addTo(this.editLayers);
			if (e.layer._mRadius) // Circle
				return;
			if (e.layer._latlng) // Point
				e.layer.snapediting = new L.Handler.MarkerSnap(map, e.layer);
			else // Line, polygone, rectangle
				e.layer.snapediting = new L.Handler.PolylineSnap(map, e.layer);
			e.layer.options.editing = {}; //DCMM TODO voir pourquoi (nouvelle version de draw)
			e.layer.snapediting.addGuideLayer(this.snapLayers);
			e.layer.snapediting.enable();
			map.fire('draw:edited');
		}, this);

		// All events at the end of a modification
		L.DomEvent.on(document, 'mouseup', function () {map.fire('draw:edited')});
//		map.on('draw:drawstop', function () {map.fire('draw:edited')});
//		map.on('draw:created', function () {map.fire('draw:edited')});
//		map.on('draw:deleted', function () {map.fire('draw:edited')});
		map.on('draw:edited', this.merge, this);

		return L.Control.Draw.prototype.onAdd.call(this, map);
	},

	// Merge polyline having end at the same position
	merge: function () {
		var ls = this.editLayers._layers;
		for (var change = true; change; change = false)
			for (il1 in ls) // Pour toutes les couches éditables
				for (il2 in ls) {
					var ll1 = ls[il1]._latlngs,
						ll2 = ls[il2]._latlngs,
						lladd = null; // List of points to move to another polyline
					if (ll1 && !ls[il1].options.fill &&  // If both are polyline
						ll2 && !ls[il2].options.fill &&
						ls[il1]._leaflet_id < ls[il2]._leaflet_id) { // Only once each pair
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
						if (lladd) {
							ll1.pop(); // We remove the last point as it's already there
							ls[il1]._latlngs = ll1.concat(lladd);
							ls[il1].editing._poly.redraw(); // Redraw the lines
							ls[il1].snapediting.updateMarkers(); // Redraw the markers
							this.editLayers.removeLayer(ls[il2].editing._poly); // Erase the initial Polyline
							change = true;
						}
					}
				}
	}
});
