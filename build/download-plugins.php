<?php
// Arguments
$n = isset ($_GET['n']) ? $_GET['n'] : 0; // Item à traiter
$all = isset ($_GET['all']) ? $_GET['all'] : 0;// Bouclage

// Liste des modules
preg_match_all ('/\n\s*\'\.\.\/github.com\/([^\/]+\/[^\/]+)/', file_get_contents ('../src/leaflet.js'), $reps);
$modules = array_values (array_filter (array_unique ($reps[1]), function ($k) {
	return strpos ($k, 'Dominique92') === false;
}));

$branches = [
// Pour Leaflet 0.7
	'Leaflet/Leaflet' => '/tree/v0.7.7',
/* Pour Leaflet 1.0
	'shramov/leaflet-plugins' => '/tree/leaflet_one',
	'rob-murray/os-leaflet' => '/tree/leaflet-1.0-beta', => Doesn't work !!
	'Leaflet/Leaflet.draw' => '/tree/leaflet-master',
	'kartena/Proj4Leaflet' => '/tree/leaflet-proj-refactor',
*/
];
//-----------------------------------
// Affichage status
foreach ($modules AS $k => $v) {
	if (isset ($branches[$v]))
		$v = $modules[$k] .= $branches[$v];

	echo "<p style='background-color:".
		($k<$n ? ($all ? 'chartreuse' : 'white') :
		($k==$n ? 'yellow' :
		'white'))
	."'>$v &nbsp; "
	."<a href='//github.com/$v'>github</a> &nbsp; "
	."<a href='download-plugins.php?n=$k&a=update'>download</a></p>";
}
echo "<p><a href='download-plugins.php?n=0&a=update&all=1'>Update all</a></p>";

if (isset ($modules[$n])) {
	//-----------------------------------
	// URLs to be used
	$url_page = 'https://github.com/'.$modules[$n];
	$page_content = file_get_contents ($url_page);
	preg_match ('/[:\/A-Za-z0-9_\-\.]+.zip/', $page_content, $url_zips);
	preg_match ('/([A-Za-z0-9_\-\.\/]+)" data-pjax\>/', $page_content, $url_commit);

	$ups = explode ('/', $url_page);
	$plugin_dir = '../github.com/'.$ups[3].'/'.$ups[4];
//	$zip_file = 'TMP-'.$ups[3].'-'.$ups[4].'.zip';
	$zip_file = 'TMP.zip';

	$url_zip = implode ('', array_merge (
		[
		  'scheme' => 'https',
		  'sep' => '://',
		  'host' => 'github.com',
		],
		parse_url ($url_page),
		parse_url ($url_zips[0])
	));

	// Vérification du niveau du plugin (si exécution all=1)
	echo "<p>Check version $plugin_dir</p>";
	if (!$all || // Si on en demande qu'un, on force
		!is_file ("$plugin_dir/CREDIT.txt") ||
		file_get_contents ("$plugin_dir/CREDIT.txt") != 'https://github.com'.$url_commit[1]) {
		echo "<p>Download $url_zip</p>";

		$zipResource = fopen($zip_file, 'w');
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
		if(!$page) {
			echo "Error download $url_zip :- ".curl_error($ch);
			exit;
		}
		curl_close($ch);

		echo '<p>Extract Zip File to ../github.com/'.$ups[3].'/...</p>';
		$zip = new ZipArchive;
		if($zip->open($zip_file) != 'true')
			echo 'Error :- Unable to open the Zip File';
		$zip->extractTo ('../github.com/'.$ups[3]);
		$zip->close();
		sleep (1); // Wait until the new folder is free

		// Renomme le répertoire existant pour le remplacer par le nouveau
		if (is_dir ($plugin_dir)) {
			echo "<p>Rename ($plugin_dir => $plugin_dir.".time().".TMP)</p>";
			rename ($plugin_dir, $plugin_dir.'.'.time().'.TMP');
		}
		foreach (glob("$plugin_dir-*") as $dirname)
			if (is_dir ($dirname)) {
				file_put_contents ("$dirname/CREDIT.txt", 'https://github.com'.$url_commit[1]);
				echo "<p>Rename $dirname ==> $plugin_dir</p>";
				rename ($dirname, $plugin_dir);
			}
	}
	//-----------------------------------
	// Boucle
	$n++;
	if ($all && !error_get_last())
		echo "<meta http-equiv='refresh' content='0;url=download-plugins.php?n=$n&all=$all'>";
}
echo"<pre style='background-color:white;color:black;font-size:14px;'>ERROR = ".var_export(error_get_last (),true).'</pre>';
?>
