# Leaflet.MapMultiCRS
Leaflet extension for multi vendors maps & projections
```
- Google,
- Bing (Microsoft),
- Open projects,
- SwissTopo (Switzerland)
- IDEE España
- IGM Italie
```

BASIS
=====
Basically, the leafLet layers use a EPSG3857 CRS (Coordinate Reference Systems)
Layers using a different CRS cannot be switched by the L.Control.Layers
This pluggin solve this issue:
- Include the file https://github.com/Dominique92/Leaflet.MapMultiCRS/blob/master/MapMultiCRS.js
- Declare the layers using a CRS different from EPSG3857 using the option {crs: L.CRS.EPSG900913}:
```javascript
var swissLayer = new L.TileLayer(
	options: {
		crs: L.CRS.EPSG21781,
		...
	},
);
```

DEMO
====
[See a DEMO](http://dominique92.github.io/MyLeaflet/github.com/Dominique92/Leaflet.MapMultiCRS/)
