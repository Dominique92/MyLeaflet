<?php

$downloads = array (
	'http://leafletjs.com/download.html',
	'https://github.com/erictheise/rrose',
	'https://github.com/k4r573n/leaflet-control-osm-geocoder',
	'https://github.com/kartena/Proj4Leaflet',
	'https://github.com/Leaflet/Leaflet.draw',
	'https://github.com/Leaflet/Leaflet.fullscreen',
	'https://github.com/makinacorpus/Leaflet.FileLayer',
	'https://github.com/makinacorpus/Leaflet.GeometryUtil',
	'https://github.com/makinacorpus/Leaflet.Snap',
	'https://github.com/mapbox/togeojson',
	'https://github.com/MrMufflon/Leaflet.Coordinates',
	'https://github.com/rob-murray/os-leaflet',
	'https://github.com/shramov/leaflet-plugins',
	'https://github.com/shramov/leaflet-plugins',
	'https://github.com/stefanocudini/leaflet-gps',
);

//-----------------------------------
$n = isset ($_GET['n']) ? $_GET['n'] : 0;

foreach ($downloads AS $k => $v)
	echo "<p style='background-color:".($k<$n?'Chartreuse ':($k==$n?'yellow':'orange'))."'>$v</p>";

//-----------------------------------
if (!isset ($downloads[$n])) {
	echo '<p><b>FINI</b></p>';
	echo '<p><a href="update.php">replay</a></p>';
	exit;
}
//-----------------------------------
$url_page = $downloads[$n];

preg_match_all ('/([A-Za-z0-9_\-\.]+)\//', $url_page, $arbo);
$arbo_path = '../'.implode ('/', $arbo[1]);

//-----------------------------------
preg_match ('/[:\/A-Za-z0-9_\-\.]+.zip/', file_get_contents ($url_page), $zs);
$url_zip = implode ('', array_merge (
	array (
	  'scheme' => 'https',
	  'sep' => '://',
	  'host' => 'github.com',
	  'path' => '/Leaflet/Leaflet.fullscreen',
	),
	parse_url ($url_page),
	parse_url ($zs[0])
));
echo "<p>Download $url_zip</p>";

//-----------------------------------
if (!isset ($_GET['load'])) {
	echo "<meta http-equiv='refresh' content='1;url=update.php?n=$n&load'>";
	exit;
}
//-----------------------------------
$zipFile = 'TMP.zip';
$zipResource = fopen($zipFile, 'w');
// Get The Zip File From Server
$ch = curl_init();
curl_setopt ($ch, CURLOPT_URL, $url_zip);
curl_setopt ($ch, CURLOPT_FAILONERROR, true);
curl_setopt ($ch, CURLOPT_HEADER, 0);
curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt ($ch, CURLOPT_AUTOREFERER, true);
curl_setopt ($ch, CURLOPT_BINARYTRANSFER,true);
curl_setopt ($ch, CURLOPT_TIMEOUT, 10);
curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0); 
curl_setopt ($ch, CURLOPT_FILE, $zipResource);
$page = curl_exec ($ch);
if(!$page)
	echo 'Error :- '.curl_error($ch);
curl_close($ch);

//-----------------------------------
echo "<p>Extract Zip File to $arbo_path/...</p>";
$zip = new ZipArchive;
if($zip->open($zipFile) != 'true')
	echo 'Error :- Unable to open the Zip File';
$zip->extractTo ($arbo_path);
$zip->close();

//-----------------------------------
echo '<meta http-equiv="refresh" content="1;url=update.php?n='.++$n.'">';
