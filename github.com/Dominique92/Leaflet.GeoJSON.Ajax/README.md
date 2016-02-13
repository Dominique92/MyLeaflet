Leaflet.GeoJSON.Ajax
====================

Leaflet extension for remote GeoJSON layers (Markers, Polylines, Polygons, ...) using AJAX.
Get the list of features from a remote <URL> & display it into the map with related & parametrables markers, lines & polygons.
Add customized markers, popup labels & click to navigate to external urls.

It depends on [Leaflet.Rrose](https://github.com/erictheise/rrose).

This plugin works both on Leaflet V0.7 & V1.0

DEMO
----
[See a DEMO](http://dominique92.github.io/MyLeaflet/github.com/Dominique92/Leaflet.GeoJSON.Ajax/)

Usage
-----

### <geoJSON> or URL content syntax must respect the [geoJSON format](http://geojson.org/geojson-spec.html)
```javascript
<geoJSON> =
{
	"type": "Feature",
	"geometry":
	{
		...
	},
	"properties":
	{
		"<NAME>": <VALUE>,
		...
	}
}
```

### <NAME>-<VALUE> pairs definitions for both layer style and geoJSON properties:
```javascript
style: {
	title: <string>, // hover label
	popupAnchor: [<int>, <int>] | default=[middle,top+5px], // point from which the popup should open relative to the iconAnchor
	url: <string>, // url where to navigate when the feature is clicked

	Markers
	iconUrl: <string>, // url of icon image
	iconSize: [<int>, <int>] | default=img size, // Size of the icon.
	iconAnchor: [<int>, <int>] | default=[middle,top], // point of the icon which will correspond to marker's location
	degroup: <int>, // Isolate too close markers by a number of pixels when the mouse hover over the group.
	Or any of the following [marker options](http://leafletjs.com/reference.html#marker-options)

	Poly*
	stroke: <boolean> | default=true, // Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
	color: <color string> | default='#03f', // Stroke color.
	weight: <number>, // Stroke width in pixels.
	opacity: <0.0..1.0> | default=0.5, // Stroke opacity.
	Or any of the following [path options](http://leafletjs.com/reference.html#path-options)

	Polygons
	fill: <boolean> | default=true // Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
	fillColor: <color string> | default=same as color, // Fill color.
	fillOpacity: <0.0..1.0> | default=0.2, // Fill opacity.
}
```

### Display local geoJSON data with local style:
```javascript
Include stylesheets/leaflet.rrose.css and javascripts/rrose-src.js

new L.GeoJSON.Style(
	<geoJSON>,
	{
		<OPTIONS>,
		style: { // The <NAME>-<VALUE> layer style pairs will replace the properties of each features.
			"<NAME>": <VALUE>,
			...
		}
	}
).addTo(map);
```

### Display local geoJSON data with style calculated from geoJSON features properties:
```javascript
new L.GeoJSON.Style(
	<geoJSON>,
	{
		<OPTIONS>,
		style: function(feature) {
			return {
				"<NAME>": feature.properties.<NAME>, // The value can be calculated from any geoJSON property for each features.
				...
			};
		}
	}
).addTo(map);
```

### Display remote geoJSON URL:
Create a L.GeoJSON.Style instance & add it to the map.

```javascript
new L.GeoJSON.Ajax(
	<URL>,
	{
		<OPTIONS>,
		style: ... // Same than above
	}
).addTo(map);
```

### Example:
[GeoJSON.Ajax.WRI.js](https://github.com/Dominique92/Leaflet.GeoJSON.Ajax/blob/master/src/GeoJSON.Ajax.WRI.js)
