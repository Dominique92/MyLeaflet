<?php
foreach (glob('../github.com/*/*/CREDIT*') AS $k => $f) {
	$fs = explode ('/', $f);
	$fcs = explode ("\r", str_replace ("\n", "", file_get_contents($f)));
	$ghc = file_get_contents ($fcs[0].'/commits/'.$fcs[1]);
	preg_match ('/(Commits on [0-9A-Za-z, ]+)/', $ghc, $commits);

	preg_match ('/\/commit\/([0-9a-z]+)\//', $ghc, $commitids);
	$fcs0s = explode ('/', $fcs[0]);
	$fcs0s [] = 'archive';
	$fcs0s [] = $commitids[1].'.zip';
	$zip = implode ('/', $fcs0s);

	echo '<p><a href="'.$fcs[0].'/commits/'.$fcs[1].'">'.$fcs[0].'</a> : '
		.$fcs[2].' / '.$commits[1].' / '
		.(count($fcs) > 4 ? '<span style="color:'.($fcs[2]==$commits[1]?'black':'red').'">'.$fcs[4].'</span> / ' : '')
		.($fcs[2]==$commits[1] ? 'OK' : '<span style="background-color:red">OBSOLETE</span>')
		.' / <a href="'.$zip.'">'.$zip.'</a></p>';
}
?>
<p>FIN</p>
<p><a href="..">RETOUR DEMO</a></p>
