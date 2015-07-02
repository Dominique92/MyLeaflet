<?php
foreach (glob("../github.com/*/*/CREDIT*") AS $k => $f) {
		$fs = explode ('/', $f);
		$fcs = explode ("\r", str_replace ("\n", "", file_get_contents($f)));
		$ghc = file_get_contents ($fcs[0].'/commits/'.$fcs[1]);
		preg_match ('/(Commits on [0-9A-Za-z, ]+)/', $ghc, $commits);
		echo '<p><a href="'.$fcs[0].'/commits/'.$fcs[1].'">'.$fcs[0].'</a> : '
			.$fcs[2].' / '.$commits[1].' / '
			.(count($fcs) > 4 ? $fcs[4].' / ' : '')
			.($fcs[2]==$commits[1] ? 'OK' : '<span style="background-color:red">OBSOLETE<span>')
			.'</p>';
}
?>