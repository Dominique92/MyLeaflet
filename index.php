<?php // File to be executed if the test environment supports PHP
include ('index.html');
include ('examples/includes/control.layers.argsgeojson.html');
include ('examples/includes/marker.coordinate.html');
include ('examples/includes/draw.plus.html');
?>

<a href="<?php if(@$_GET['dist']) echo'src/Leaflet.GeoJSON.Ajax'; else echo'?dist=dist';?>"
   style="position:absolute;top:150px;right:0;text-decoration:none;font-size:large"
   title="<?php if(@$_GET['dist']) echo'Test ajax'; else echo'Test avec les librairies compressées';?>">
	&#10144;
</a>

<a href="index.html"
   style="position:absolute;top:200px;right:0;text-decoration:none;font-size:large"
   title="Test en mode html">
	&#10144;
</a>

<h2><u>Admin corner</u></h2>
<p><a href="build" target="_blank">Générer les librairies compressées leaflet.css &amp; leaflet.js</a></p>
