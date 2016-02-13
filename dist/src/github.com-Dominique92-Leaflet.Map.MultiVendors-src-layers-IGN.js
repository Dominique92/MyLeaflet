/*
 * Copyright (c) 2014 Dominique Cavailhez
 * https://github.com/Dominique92
 * Support� sur Leaflet V0.7 & V1.0
 *
 * Cartes fran�aises
 * Projections Lambert et couches IGN
 * Cl� de d�veloppement (localhost) sur: http://api.ign.fr
 * Cl� de production sur: http://pro.ign.fr/api-web => Service en ligne => S'ABONNER
 * Doc sur http://api.ign.fr/jsp/site/Portal.jsp?page_id=6&document_id=80&dossier_id=53
 *
 * Layers (d�pend de l'abonnement li� � votre cl�)
	new L.TileLayer.IGN({k:'CLE_IGN', l:'GEOGRAPHICALGRIDSYSTEMS.MAPS'}) : Normal
	new L.TileLayer.IGN({k:'CLE_IGN', l:'ORTHOIMAGERY.ORTHOPHOTOS'}) : Photos
	new L.TileLayer.IGN({k:'CLE_IGN', l:'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD'}) : TOP 25
	new L.TileLayer.IGN({k:'CLE_IGN', l:'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.CLASSIQUE'}) : Nouvelle pr�sentation
	new L.TileLayer.IGN({k:'CLE_IGN', l:'CADASTRALPARCELS.PARCELS'}) : Cadastre
 */

L.TileLayer.IGN = L.TileLayer.extend({
	options: {
		l: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
		attribution: '&copy; <a href="http://www.ign.fr/">IGN</a>'
	},
	initialize: function(options) {
		L.TileLayer.prototype.initialize.call(this,
			"http://gpp3-wxs.ign.fr/{k}/wmts" +
				"?LAYER={l}"+
				"&FORMAT=image/jpeg"+
				"&SERVICE=WMTS"+
				"&VERSION=1.0.0"+
				"&REQUEST=GetTile"+
				"&STYLE=normal"+
				"&TILEMATRIXSET=PM"+
				"&TILEMATRIX={z}"+
				"&TILECOL={x}"+
				"&TILEROW={y}",
			options
		);
	}
});