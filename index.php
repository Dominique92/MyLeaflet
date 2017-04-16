<?php // File to be executed if the test environment supports PHP
include ('index.html');
include ('examples/includes/control.layers.argsgeojson.html');
include ('examples/includes/marker.coordinate.html');
include ('examples/includes/draw.plus.html');
?>

<h2><u>Admin corner</u></h2>
<p><a href="build" target="_blank">Générer les librairies compressées leaflet.css &amp; leaflet.js</a></p>

<script> // Replace test link
	var t = document.getElementById("test"); //.innerHTML = '<input type="submit" name="post" id="save" value="Save" />';
	t.href = "index.html";
	t.title = "Test en mode html";
</script>
