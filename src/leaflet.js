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

	// Draw for leaflet
	'../node_modules/leaflet-draw/dist/Leaflet.draw-src.js',

	// SNAP
	'../node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js', // A mettre sinon snap plante.
	'../node_modules/leaflet-snap/leaflet.snap.js',

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
