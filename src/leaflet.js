/*
 * Integrated by Dominique Cavailhez (c) 2016
 * https://github.com/Dominique92/MyLeaflet
 *
 * List .js files to be included in the MyLeaflet library.
 */

var deps = [
	// Kernel leaflet
	'../node_modules/leaflet/dist/Leaflet-src.js',

	// Controls
	'../node_modules/leaflet.coordinates/src/util/NumberFormatter.js',
	'../node_modules/leaflet.coordinates/src/Control.Coordinates.js',

	'../node_modules/leaflet-plugins/control/Permalink.js',
	'../node_modules/leaflet-plugins/control/Permalink.Layer.js',
	'../lib/Leaflet.Permalink.Cookies-master/src/Permalink.Cookies.js',
	
	'../lib/Leaflet.fullscreen-gh-pages/dist/Leaflet.fullscreen.js',
	'../lib/leaflet-control-osm-geocoder-master/Control.OSMGeocoder.js',
	'../node_modules/leaflet-gps/src/leaflet-gps.js',

	'../lib/togeojson-master/togeojson.js',
	'../lib/Leaflet.FileLayer-master/src/leaflet.filelayer.js',
	'../src/Control.Click.js',

	'../lib/leaflet-easyPrint-gh-pages/dist/leaflet.easyPrint.js',

	// Couches autres fournisseurs
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/OSM.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/IGN.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/IGM.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/IDEE.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/Google.js',

	// CRS exotiques
	'../node_modules/proj4/dist/proj4-src.js',
	'../node_modules/proj4leaflet/src/proj4leaflet.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/MapMultiCRS.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/SwissTopo.js',
	'../lib/os-leaflet-master/OSOpenSpace.js',
	'../node_modules/leaflet-plugins/layer/tile/Bing.js',
	'../lib/Leaflet.Map.MultiVendors-master/src/layers/TileLayer.collection.js',

	// Couches vectotielles
	'../lib/rrose-master/leaflet.rrose-src.js',
	'../lib/Leaflet.GeoJSON.Ajax-master/src/GeoJSON.Style.js',
	'../lib/Leaflet.GeoJSON.Ajax-master/src/GeoJSON.Ajax.js',
	'../lib/Leaflet.GeoJSON.Ajax-master/src/Control.Layers.argsGeoJSON.js', // Define a second control layer for overlays arguments selection
	'../lib/Leaflet.GeoJSON.Ajax-master/src/layers/GeoJSON.Ajax.OSM.js', // Specific layer for 
// INSERER SUR DEMANDE	'../lib/Leaflet.GeoJSON.Ajax-master/layers/GeoJSON.Ajax.WRI.js',
//	'../lib/leaflet-omnivore-master/leaflet-omnivore.js', // TODO KML/ ...

//	'../lib/togpx-master/togpx.js', // Converts GeoJSON to GPX.
	'../lib/Leaflet.Marker.coordinates-master/src/CRS.js',
	'../lib/Leaflet.Marker.coordinates-master/src/Marker.coordinates.js',

/* DRAW FOR LEAFLET */
	// The core of the plugin. Currently only includes the version.
	'../lib/Leaflet.draw-master/src/Leaflet.draw.js',
	'../lib/Leaflet.draw-master/src/Leaflet.Draw.Event.js',

	// Drawing handlers for: polylines, polygons, rectangles, circles and markers.
	'../lib/Leaflet.draw-master/src/draw/handler/Draw.Feature.js',
	'../lib/Leaflet.draw-master/src/draw/handler/Draw.Polyline.js',
	'../lib/Leaflet.draw-master/src/draw/handler/Draw.Polygon.js',
//	'../lib/Leaflet.draw-master/src/draw/handler/Draw.SimpleShape.js',
//	'../lib/Leaflet.draw-master/src/draw/handler/Draw.Rectangle.js',
//	'../lib/Leaflet.draw-master/src/draw/handler/Draw.Circle.js',
	'../lib/Leaflet.draw-master/src/draw/handler/Draw.Marker.js',

	// Editing handlers for: polylines, polygons, rectangles, and circles.
//	'../lib/Leaflet.draw-master/src/edit/handler/Edit.Marker.js',
	'../lib/Leaflet.draw-master/src/edit/handler/Edit.Poly.js',
//	'../lib/Leaflet.draw-master/src/edit/handler/Edit.SimpleShape.js',
//	'../lib/Leaflet.draw-master/src/edit/handler/Edit.Rectangle.js',
//	'../lib/Leaflet.draw-master/src/edit/handler/Edit.Circle.js',

	// Extensions of leaflet classes.
	'../lib/Leaflet.draw-master/src/ext/TouchEvents.js', // Pour draw+ optim poly
	'../lib/Leaflet.draw-master/src/ext/LatLngUtil.js',
	'../lib/Leaflet.draw-master/src/ext/GeometryUtil.js',
	'../lib/Leaflet.draw-master/src/ext/LineUtil.Intersect.js',
	'../lib/Leaflet.draw-master/src/ext/Polyline.Intersect.js', // Nécéssaire pour merger les lignes
//	'../lib/Leaflet.draw-master/src/ext/Polygon.Intersect.js',

	// Common UI components used.
	'../lib/Leaflet.draw-master/src/Control.Draw.js',
	'../lib/Leaflet.draw-master/src/Toolbar.js',
	'../lib/Leaflet.draw-master/src/Tooltip.js',

	// Draw toolbar.
	'../lib/Leaflet.draw-master/src/draw/DrawToolbar.js',

	// Edit toolbar.
	'../lib/Leaflet.draw-master/src/edit/EditToolbar.js',
	'../lib/Leaflet.draw-master/src/edit/handler/EditToolbar.Edit.js',
	'../lib/Leaflet.draw-master/src/edit/handler/EditToolbar.Delete.js',

	'../src/stubs-draw.js', // Stubs for optimized geometries
/* END DRAW */

	// SNAP
	'../lib/Leaflet.GeometryUtil-master/src/leaflet.geometryutil.js', // A mettre sinon snap plante.
	'../lib/Leaflet.Snap-master/leaflet.snap.js',

	'../lib/Leaflet.draw.plus-master/src/Control.Draw.Plus.js',

	'../src/Control.Layers.remanent.js', // Keep the layer selector open until we leave the map
	'../src/locales.fr.js', // Adaptations
	'../src/patches.js', // Plugin's patches
	'../src/AntiBot.js', // Frezze map on pages called by bots
];

var scripts = document.getElementsByTagName('script'),
	script = scripts[scripts.length - 1].src,
	racineSources = script.substring(0, script.lastIndexOf('/')) + '/';

for (j in deps)
		document.write('<script src="' + racineSources + deps[j] + '"></script>');
