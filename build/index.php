<?php
// Copy proprietary files
cp ('../LICENSE.txt', '../dist/LICENSE.txt');

//----------------------------
// Copy image files
foreach (glob ('../src/images/*') AS $f)
	cp ($f, '../dist/images/github.com-Dominique92-MyLeaflet-src-images-'.pathinfo ($f, PATHINFO_BASENAME));

//----------------------------
// Update plugins Dominique92
if (is_dir ('../../github.Dominique92'))
	recurse_copy ('../github.com/Dominique92/', '../../github.Dominique92/');

//----------------------------
echo "<br/><div>Compression des .js</div>";

use Patchwork\JSqueeze;
require ('../github.com/nicolas-grekas/JSqueeze/src/JSqueeze.php');
$js_compress = new JSqueeze();

// Liste des includes .js
preg_match_all ('/\n\s*\'(([^\/]).+\.js)\'/', file_get_contents ('../src/leaflet.js'), $jsf);
$jsf[1][] = '../build/src/flat-css.js';

// Liste des modules github inclus
preg_match_all ('/\n\s*\'\.\.\/(github\.com\/[^\/]+\/[^\/]+)/', $ll=file_get_contents ('../src/leaflet.js'), $gits);
foreach ($gits[1] AS $g)
	if (is_file ("../$g/CREDIT.txt"))
		$gitsv[$g] = str_replace ('/commit/', '/tree/', file_get_contents ("../$g/CREDIT.txt"));

$mini_js [] = "/**
 * Integrated by Dominique Cavailhez (c) 2016
 * https://github.com/Dominique92/MyLeaflet
 * Includes part of :
\t" .implode ("\n\t", $gitsv) ."
*/
";

foreach ($jsf[1] AS $fj) {
	echo "<div>Compression de $fj</div>";
	$mini_js [] = $js_compress->squeeze(file_get_contents ($fj));
}

// Ecrit le fichier
echo "<div>Ecriture de ../leaflet.js</div>";
file_put_contents ('../leaflet.js', implode(PHP_EOL, $mini_js));
cp ('../leaflet.js', '../dist/leaflet.js');

//-----------------------------------
echo "<br/><div>Compression des .css</div>";

require '../github.com/tubalmartin/YUI-CSS-compressor-PHP-port/cssmin.php';
$css_compress = new CSSmin();

// Liste des .css
preg_match_all('/[A-Za-z0-9_\-\.\/]+\.css/', file_get_contents ('../src/Leaflet.css'), $css_files);
foreach ([
	'../dist/' => 'images/',
	'../' => 'dist/images/',
] as $k => $v) {
	$mini_css = [];
	foreach ($css_files[0] AS $css_file)
		$mini_css [] = preg_replace_callback (
			'/url\(\'?\"?([A-Za-z0-9@_\-\.\/]+)\"?\'?\)/', 
			function ($matches) {
				global $css_file, $k, $v;
				$source = pathinfo ($css_file, PATHINFO_DIRNAME) .'/'.$matches[1];
				$destination = str_replace (['../','/'], ['','-'], $source);

				// Copie les fichiers images dans le répertoire de distribution
				cp ($source, "../dist/images/$destination");

				// Remplace les répertoires des url relatifs au fichier CSS d'origine
				return "url($v$destination)";
			},
			$css_compress->run (file_get_contents ($css_file))
		);

	echo "<div>Ecriture de ".$k."leaflet.css</div>";
	file_put_contents ($k.'leaflet.css', "/**
 * Integrated by Dominique Cavailhez (c) 2016
 * https://github.com/Dominique92/MyLeaflet
 */
".implode(PHP_EOL,$mini_css));
}

//----------------------------
function cp ($s, $d) {
	$di = pathinfo ($d);
	if (!is_dir($di['dirname'])) {
		echo "<div>mkdir $d</div>";
		mkdir($di['dirname']);
	}
	echo "<div>copy ($s, $d)</div>";
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
                cp($src . '/' . $file,$dst . '/' . $file); 
        } 
    closedir($dir); 
}
?>