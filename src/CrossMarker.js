/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Layer affichant une croix entourée d'un cercle
 */

L.CrossMarker = L.CircleMarker.extend({
	getPathString: function () {
		var p = this._point,
		    r = this._radius;

		if (this._checkIfEmpty()) {
			return '';
		}

		if (L.Browser.svg) {
			return 'M' + p.x + ',' + (p.y - r) +
			       'A' + r + ',' + r + ',0,1,1,' +
			       (p.x - 0.1) + ',' + (p.y - r) 
				   
				   + 'L' + p.x + ',' + (p.y + this._radius)
				   + 'M' + (p.x-r) + ',' + (p.y)
				   + 'L' + (p.x + this._radius) + ',' + (p.y )
			       
				   + ' z';
		} else {
			p._round();
			r = Math.round(r);
			return 'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r + ' 0,' + (65535 * 360);
		}
	}
});