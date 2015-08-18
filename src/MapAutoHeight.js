/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Tune the map height accordighly with map width
 */

L.Map.addInitHook(function() {
	if (!this._container.offsetHeight) { // Set no height to the map <DIV>
		L.DomEvent['on'](
			window, 'resize', // Execute when the window resize
			this.autoHeight,
			this
		);
		this.autoHeight();// Execute during the init phase
	}
});

L.Map.include({
	autoHeight: function() {
		this._container.style.height = this._container.offsetWidth + 'px';
	}
});