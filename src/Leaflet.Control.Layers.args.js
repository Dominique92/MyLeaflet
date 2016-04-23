/*
 * Copyright (c) 2016 Dominique Cavailhez
 * Checkbox control for Ajax layers parameters
 */

L.Control.Layers.args = L.Control.Layers.overflow.extend({
	_cookie: document.cookie.match(/layerargs=([^;]+)/), // Mem here before it's corrupted by L.Control.Permalink._update_href

	initialize: function(defargs, options) {
		L.Control.Layers.overflow.prototype.initialize.call(this, {}, defargs, options);
	},

	onAdd: function (map) {
		var r = L.Control.Layers.overflow.prototype.onAdd.call(this, map);

		if (this._cookie) {
			var cookChecked = this._cookie[1].split(','),
				inputs = this._form.getElementsByTagName('input'),
				inputsLen = inputs.length;
			
			for (var i = 0; i < inputsLen; i++) {
				var input = inputs[i],
					obj = this._layers[input.layerId];
				input.checked = cookChecked.indexOf(obj.name) != -1;
			}
		}

		return r;
	},

	args: function (name) {
		var r = [], check = [],
		    inputs = this._form.getElementsByTagName('input'),
		    inputsLen = inputs.length;

		for (var i = 0; i < inputsLen; i++) {
			var input = inputs[i],
				obj = this._layers[input.layerId];
			if (input.checked) {
				check.push (obj.name);
				var a =
					typeof obj.layer.p != 'undefined' ? obj.layer.p + '=' + obj.layer.v :
					obj.layer.v ||
					obj.name;
				if (typeof name == 'undefined')
					r.push (a);
				else if (obj.name == name)
					r = a;
			}
		}

		document.cookie = 'layerargs=' + check.join(',') + ';path=/';

		return r;
	},

	_onInputClick: function () {
		this._map.fire('clicklayerarg');
	}
});