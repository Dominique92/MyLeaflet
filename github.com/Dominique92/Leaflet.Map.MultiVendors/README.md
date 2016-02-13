# Leaflet.Map.MultiVendors
Leaflet extension for multi vendors maps & projections
```
- OSM, Thunder Forest, Refuges.info
- IGN France
- SwissTopo
- IDEE España
- IGM Italie
- OS Great Britain
- Kompass Austria
- Bing Microsoft
- Google maps
```

This plugin works both on Leaflet V0.7 & V1.0

DEMO
----
[See a DEMO using Leaflet V0.7](http://dominique92.github.io/MyLeaflet/github.com/Dominique92/Leaflet.Map.MultiVendors/)
[See a DEMO using Leaflet V1.0](http://dominique92.github.io/MyLeaflet/github.com/Dominique92/Leaflet.Map.MultiVendors.Ajax/test/index-v1.0.html)

BASIS
=====
Basically, the leafLet layers use a EPSG3857 CRS (Coordinate Reference Systems)
Layers using a different CRS cannot be switched by the L.Control.Layers

This pluggin solve this issue:
- Add L.Control.Layers to the map
- Include the file https://github.com/Dominique92/Leaflet.Map.MultiVendors/blob/master/TileLayer.collection.js
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
