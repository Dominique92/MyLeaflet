# Leaflet.MapMultiCRS
Leaflet extension for multi vendors maps & projections
```
- IGN France
- SwissTopo
- IDEE España
- IGM Italie
- OS Great Britain
- Libres: OSM, Thunder Forest
- Bing Microsoft
- Google maps
- MapQuest AOL
```

DEMO
====
[See a DEMO](http://dominique92.github.io/MyLeaflet/github.com/Dominique92/Leaflet.MapMultiCRS/)

BASIS
=====
Basically, the leafLet layers use a EPSG3857 CRS (Coordinate Reference Systems)
Layers using a different CRS cannot be switched by the L.Control.Layers

This pluggin solve this issue:
- Add L.Control.Layers to the map
- Include the file https://github.com/Dominique92/Leaflet.MapMultiCRS/blob/master/MapMultiCRS.js
- Declare the layers using a CRS different from EPSG3857 using the option {crs: L.CRS.EPSG900913}:
- By default, EPSG3857 is assumed
```javascript
var swissLayer = new L.TileLayer(
	options: {
		crs: L.CRS.EPSG21781,
		...
	},
);
```
