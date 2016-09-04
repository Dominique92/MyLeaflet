Dominique92.MyLeaflet
=====================

Leaflet extensions for
* Multi vendors maps &amp; projections:
```
- IGN France
- SwissTopo
- IDEE España
- IGM Italie
- OS Great Britain
- Kompass Austria
- Libres: OSM, Maps.Refuges.Info, Thunder Forest, Hike & Bike, ClycleMap, Outdoors & Bike, ClycleMap, 
- Bing Microsoft
- Google maps
```
* GeoJson ajax layers,
* Editable position marker with multi-projection position display,
* Markers, polylines & polugons editor.

DEMO
====
[See a DEMO here](http://dominique92.github.io/MyLeaflet/)

USAGE
=====
* Include MyLeaflet for production (compressed files):
```html
	<link  href="dist/leaflet.css" rel="stylesheet" />
	<script src="dist/leaflet.js"></script>
```
* Dist compressed files generation: run build/index.php
* For tinny distribution: only copy dist/... files

* Include MyLeaflet for developpement (full sources):
```html
	<link  href="src/leaflet.css" rel="stylesheet" />
	<script src="src/leaflet.js"></script>
```

FILES
=====
* /build/... : Files compression tool + github plugins update.
* /dist/... : Tinny distribution files.
* /github.com/... : Local copy of some of github Leaflet kernel & pluggins files used in this library.
A CREDIT.txt file gives the github commit ref of each plugin.
Some very few sources modifications are taged "GEO", "GEO optimisation" or "GEOmin".
* /libs/... : Other extern libraries
* /src/... : Sources specific to MyLeaflet.
* /src/leaflet.css /src/leaflet.js : List of source files included in this package.
* /index.html : generic demo on a non PHP server.
* /index.php : generic demo on a PHP & MySql server.
* /test/... : Debug test files or ongoing developments.

Other Leaflet Plugins from this collection 
==========================================
* [Leaflet.GeoJSON.Ajax](https://github.com/Dominique92/Leaflet.GeoJSON.Ajax) remote GeoJSON & OSM overpass layers (Markers, Polylines, Polygons, ...).
* [Leaflet.Map.MultiVendors](https://github.com/Dominique92/Leaflet.Map.MultiVendors) multi vendors maps & projections.
* [Leaflet.draw.plus](https://github.com/Dominique92/Leaflet.draw.plus) on line markers, polylines & polygons editing.
* [Leaflet.Permalink.Cookies](https://github.com/Dominique92/Leaflet.Permalink.Cookies) keeping permalink in cookies.
