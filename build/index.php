<?php
require('magic-min/class.magic-min.php');

if (!is_dir('../dist'))
	mkdir('../dist');
if (!is_dir('../dist/images'))
	mkdir('../dist/images');
if (!is_dir('../dist/src'))
	mkdir('../dist/src');
copy ('../LICENSE.txt', '../dist/LICENSE.txt');

// On compresse les librairies
$minified = new Minifier( array(
	'encode' => false, // Base64 encoded images (**local or remote**) can automatically replace file references during generation.  This applies only to CSS files.
	'timer' => false, // Output the total execution time
	'gzip' => false, 
	'closure' => false, // Use the Google Closure API as opposed to jsmin (jsmin is default)
	'remove_comments' => true, // Retain or remove comments within file contents
	'echo' => false, // Mets le résultat dans une variable
	'create_new' => true, // Ecrase les fichier existants
));

preg_match_all ('/\("\.\.\/([a-zA-Z0-9\-\/\.]+)"\)/', file_get_contents ('../src/leaflet.css'), $css_list);
$minified->merge ('../dist/leaflet.css', '', $css_list[1]);

preg_match_all ('/\'\.\.\/([a-zA-Z0-9\-\/\.]+)\',/', file_get_contents ('../src/leaflet.js'), $js_list);
$minified->merge ('../dist/leaflet.js', '', $js_list[1]);
?>
<p>FIN</p>
<p><a href=".">RELANCER BUILD</a></p>
<p><a href="..">RETOUR DEMO</a></p>
