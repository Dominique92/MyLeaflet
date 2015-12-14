/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Markers, Polylines, Polygons, Rectangles & Circle editor
 * Slice polylines
 * Polygon to polyline switch
 * Stick on other vectors layers
 * Needs http://github.com/Leaflet/Leaflet.draw and http://github.com/makinacorpus/Leaflet.Snap
 */

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
		this._fireEdit();
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

	revertLayers: function() {},

	_removeLayer: function(e) {
		this._map.fire('draw:created', {
			layer: e.target.options.fill ? new L.Polyline(e.target._latlngs) : new L.Polygon(e.target._latlngs)
		});

		L.EditToolbar.Delete.prototype._removeLayer.call(this, e);
	},
});