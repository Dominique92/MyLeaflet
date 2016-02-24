<?php
// Copy proprietary files
cp ('../LICENSE.txt', '../dist/LICENSE.txt');
//cp ('../proxy.php', '../dist/proxy.php');

//----------------------------
file_put_contents ('../dist/READ.ME',
"For production, include:
<link type=\"text/css\" rel=\"stylesheet\" href=\"leaflet.css\" />
<script type=\"text/javascript\" src=\"leaflet.js\"></script>

For debug, include:
<link type=\"text/css\" rel=\"stylesheet\" href=\"leaflet.css\" />
<script type=\"text/javascript\" src=\"src/leaflet.js\"></script>

Do not modify the files in this directory:
The source of this software is available at : https://github.com/Dominique92/MyLeaflet");

//----------------------------
// Copy image files
foreach (glob ('../src/images/*') AS $f)
	cp ($f, '../dist/images/github.com-Dominique92-MyLeaflet-src-images-'.pathinfo ($f, PATHINFO_BASENAME));

//----------------------------
// Update plugins Dominique92
recurse_copy ('../github.com/Dominique92/', '../../');

//----------------------------
echo 'Compression des .js';

use Patchwork\JSqueeze;
require ('../github.com/nicolas-grekas/JSqueeze/src/JSqueeze.php');
$js_compress = new JSqueeze();

$leaflet_include = [
"/**
 * Integrated by Dominique Cavailhez (c) 2016
 * https://github.com/Dominique92/MyLeaflet
 */

var scripts = document.getElementsByTagName('script'),
	script = scripts[scripts.length - 1].src,
	racineSources = script.substring(0, script.lastIndexOf('/')) + '/';
",
];
// Liste des includes .js
preg_match_all ('/\n\s*\'(([^\/]).+\.js)\'/', file_get_contents ('../src/leaflet.js'), $jsf);
$jsf[1][] = '../build/src/flat-css.js';
foreach ($jsf[1] AS $fj) {
	// Copie les fichiers sources non compressés
	$debug_file = str_replace(['../','/'],['','-'],$fj);
	if (!strstr ($debug_file, 'github.com'))
		$debug_file = 'github.com-Dominique92-MyLeaflet-'.$debug_file;
	cp ($fj, '../dist/src/'.$debug_file);
	$leaflet_include [] = "document.write('<script src=\"'+racineSources+'$debug_file\"></script>');";

	// Compression des .js
	$mini_js [] = $js_compress->squeeze(file_get_contents ($fj));
}

file_put_contents ('../dist/src/leaflet.js', implode (PHP_EOL, $leaflet_include));
file_put_contents ('../dist/src/leaflet.css', '@import url("../leaflet.css");');

// Liste des modules github inclus
preg_match_all ('/\n\s*\'\.\.\/(github\.com\/[^\/]+\/[^\/]+)/', $ll=file_get_contents ('../src/leaflet.js'), $gits);

foreach ($gits[1] AS $g)
	if (is_file ("../$g/CREDIT.txt"))
		$gitsv[$g] = str_replace ('/commit/', '/tree/', file_get_contents ("../$g/CREDIT.txt"));

// Ecrit le fichier
file_put_contents ('../dist/leaflet.js', "/**
 * Integrated by Dominique Cavailhez (c) 2016
 * https://github.com/Dominique92/MyLeaflet
 * Includes part of :
\t" .implode ("\n\t", $gitsv) ."
*/
" .implode(PHP_EOL,$mini_js));

//-----------------------------------
echo '<br/><br/>Compression des .css';

require '../github.com/tubalmartin/YUI-CSS-compressor-PHP-port/cssmin.php';
$css_compress = new CSSmin();

// Liste des .css
preg_match_all('/[A-Za-z0-9_\-\.\/]+\.css/', file_get_contents ('../src/Leaflet.css'), $css_files);
foreach ($css_files[0] AS $css_file)
	$mini_css [] = preg_replace_callback (
		'/url\(\'?\"?([A-Za-z0-9@_\-\.\/]+)\"?\'?\)/', 
		function ($matches) {
			global $css_file;
			$source = pathinfo ($css_file, PATHINFO_DIRNAME) .'/'.$matches[1];
			$destination = 'images/'.str_replace (['../','/'], ['','-'], $source);

			// Copie les fichiers images dans le répertoire de distribution
			cp ($source, '../dist/'.$destination);

			// Remplace les répertoires des url relatifs au fichier CSS d'origine
			return 'url("'.$destination.'")';
		},
		$css_compress->run (file_get_contents ($css_file))
	);

file_put_contents ('../dist/leaflet.css', "/**
 * Integrated by Dominique Cavailhez (c) 2016
 * https://github.com/Dominique92/MyLeaflet
 */
".implode(PHP_EOL,$mini_css));

//----------------------------
function cp ($s, $d) {
	$di = pathinfo ($d);
	if (!is_dir($di['dirname'])) {
		echo "<br/>mkdir $d";
		mkdir($di['dirname']);
	}
	echo "<br/>copy ($s, $d)";
	copy ($s, $d);
}
//----------------------------
function recurse_copy($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) )
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) )
                recurse_copy($src . '/' . $file,$dst . '/' . $file); 
            else
                copy($src . '/' . $file,$dst . '/' . $file); 
        } 
    closedir($dir); 
}
?>
