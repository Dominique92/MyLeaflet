/**
 * Integrated by Dominique Cavailhez (c) 2014
 * https://github.com/Dominique92/MyLeaflet
 *
 * Liste des fichiers js inclus dans la librairie
 */

var js_list = [
	'../leafletjs.com/leaflet-src.js',

	// Controles
	'../github.com/Leaflet/Leaflet.fullscreen/dist/Leaflet.fullscreen.js',
	'../github.com/stefanocudini/leaflet-gps/src/leaflet-gps.js',
	'../github.com/shramov/leaflet-plugins/control/Permalink.js',
	'../github.com/MrMufflon/Leaflet.Coordinates/src/util/NumberFormatter.js', // Pour Coordinates
	'../github.com/MrMufflon/Leaflet.Coordinates/src/Control.Coordinates.js',
	'../github.com/k4r573n/leaflet-control-osm-geocoder/Control.OSMGeocoder.js',
	'../src/MapAutoHeight.js',

	// Carte multi fournisseurs
	'../github.com/kartena/Proj4Leaflet/lib/proj4-compressed.js',
	'../github.com/kartena/Proj4Leaflet/src/proj4leaflet.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/MapMultiCRS.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/OSM.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/IGN.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/IGM.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/IDEE.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/SwissTopo.js',
	'../github.com/shramov/leaflet-plugins/layer/tile/Google.js',
	'../github.com/shramov/leaflet-plugins/layer/tile/Bing.js',
	'../github.com/rob-murray/os-leaflet/src/osopenspace.js',
	'../github.com/Dominique92/Leaflet.MapMultiCRS/MapMultiVendors.js',

	// Couches vectotielles
	'../github.com/makinacorpus/Leaflet.FileLayer/leaflet.filelayer.js',
	'../github.com/mapbox/togeojson/togeojson.js',
	'../github.com/erictheise/rrose/rrose-src.js',
	'../github.com/Dominique92/Leaflet.GeoJSON.Ajax/GeoJSON.Ajax.js',
	'../src/MarkerPosition.js',

	// Editeur
	'../github.com/makinacorpus/Leaflet.GeometryUtil/dist/leaflet.geometryutil.js', // src/ext/geometryutil.js plante.
	'../github.com/Leaflet/Leaflet.draw/dist/leaflet.draw-src.js',
	'../github.com/makinacorpus/Leaflet.Snap/leaflet.snap.js',
	'../src/draw-plus.js',
//	'../src/PolylineEditor.js',

	// Adaptations
	'../src/locales.fr.js',
];
var js_list_DRAW = [
	'../github.com/Leaflet/Leaflet.draw/src/Leaflet.draw.js',

	'../github.com/Leaflet/Leaflet.draw/src/Toolbar.js',
	'../github.com/Leaflet/Leaflet.draw/src/Tooltip.js',
//*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/ext/GeometryUtil.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/ext/LatLngUtil.js',
	'../github.com/Leaflet/Leaflet.draw/src/ext/LineUtil.Intersect.js',
//*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/ext/Polygon.Intersect.js',
	'../github.com/Leaflet/Leaflet.draw/src/ext/Polyline.Intersect.js',

/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/draw/DrawToolbar.js',
	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.Feature.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.SimpleShape.js',
	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.Polyline.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.Circle.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.Marker.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.Polygon.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/draw/handler/Draw.Rectangle.js',

	'../github.com/Leaflet/Leaflet.draw/src/edit/EditToolbar.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/EditToolbar.Edit.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/EditToolbar.Delete.js',

/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/Control.Draw.js',

	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/Edit.Poly.js',
//*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/Edit.SimpleShape.js',
//*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/Edit.Circle.js',
//*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/Edit.Rectangle.js',
/*DCMM*/	'../github.com/Leaflet/Leaflet.draw/src/edit/handler/Edit.Marker.js',

];

var scripts = document.getElementsByTagName('script'),
	script = scripts[scripts.length - 1].src,
	racineSources = script.substring(0, script.lastIndexOf('/')) + '/';
   
for (j in js_list)
	document.write('<script type="text/javascript" src="' + racineSources + js_list[j] + '"></script>');
