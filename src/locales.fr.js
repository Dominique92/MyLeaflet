/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Traduction des textes apparaissant à l'exécution
 */

// Fixe un bug de reconnaissance de path si leaflet.js n'est pas inclus directement
L.Icon.Default.imagePath = L.Icon.Default.imagePath.replace(/(dist\/src|dist|src)/g, 'leafletjs.com');

if (navigator.language || navigator.userLanguage == 'fr') {
	if (L.Control.Fullscreen)
		L.Control.Fullscreen = L.Control.Fullscreen.extend({
			options: {
				title: {
					'false': 'Plein écran',
					'true': 'Sortir du plein écran'
				}
			}
		});

	if (L.Control.Gps)
		L.Control.Gps = L.Control.Gps.extend({
			options: {
				title: 'Afficher votre position GPS'
			}
		});

	if (L.Control.FileLayerLoad)
		L.Control.FileLayerLoad = L.Control.FileLayerLoad.extend({
			statics: {
				TITLE: 'Charger un fichier GPX, KML, GeoJSON'
			}
		});

	if (L.Control.OSMGeocoder)
		L.Control.OSMGeocoder = L.Control.OSMGeocoder.extend({
			options: {
				position: 'topleft',
				text: 'Chercher'
			}
		});

	if (L.Control.PolylineEditor)
		L.Control.PolylineEditor = L.Control.PolylineEditor.extend({
			options: {
				help: [
					'EDITEUR DE LIGNE', // TODO DCMM DELETE
					'Créer une nouvelle ligne: double cliquer sur la carte',
					'Insérer un sommet: cliquer et glisser le carré intermédiaire',
					'Déplacer un sommet: cliquer et glisser le carré',
					'Supprimer un sommet: cliquer sur le carré',
					'NOTE: un effet d\'adhérence prend les coordonnées des points proches',
					'NOTE: l\'éditeur fusionne les lignes de même extrémité',
					'Supprimer un segment: cliquer sur le carré intermédiaire',
					'Allonger une ligne: cliquer sur le carré à l\'extrémité',
					'Supprimer une ligne: cliquer sur la ligne',
					'Enregistrer les modifications: '
				]
			}
		});
}

// Style de base des polylines édités
L.Draw.Polyline = L.Draw.Polyline.extend({
	options: {
		shapeOptions: {
			color: 'red',
			opacity: 1
		}
	}
});
L.Polyline = L.Polyline.extend({ // DCMM TODO DELETE
	options: {
		color: 'red',
		weight: 4,
		opacity: 1
	}
});

/* DCMM REMOVE comment
L.drawLocal = {
	draw: {
		toolbar: {
			actions: {
				title: 'Annuler le dessin',
				text: 'Annuler'
			},
			undo: {
				title: 'Supprimer le dernier point',
				text: 'Supprimer le dernier point'
			},
			buttons: {
				polyline: 'Tracer une ligne',
				polygon: 'Tracer un polygone',
				rectangle: 'Tracer un rectangle',
				circle: 'Tracer un cercle',
				marker: 'Placer un marqueur'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: 'Cliquer et glisser pour tracer un cercle'
				},
				radius: 'Rayon'
			},
			marker: {
				tooltip: {
					start: 'Cliquer sur la carte pour placer un marqueur'
				}
			},
			polygon: {
				tooltip: {
					start: 'Cliquer pour commencer le dessin d\'un polygone',
					cont: 'Cliquer pour continuer le dessin d\'un polygone',
					end: 'Cliquer sur le premier point close le polygone'
				}
			},
			polyline: {
				error: '<strong>Erreur:</strong> Les contours de la forme ne peuvent pas se croiser !',
				tooltip: {
					start: 'Cliquer pour commencer une ligne',
					cont: 'Cliquer pour continuer le dessin de la ligne',
					end: 'Cliquer sur le dernier point pour finir la ligne'
				}
			},
			rectangle: {
				tooltip: {
					start: 'Cliquer et glisser pour tracer un rectangle'
				}
			},
			simpleshape: {
				tooltip: {
					end: 'Relacher la souris pour finir le dessin'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: 'Finir les changements',
					text: 'Finir'
				},
				cancel: {
					title: 'Annuler les changements',
					text: 'Annuler'
				}
			},
			buttons: {
				edit: 'Editer des items',
				editDisabled: 'Pas d\'items',
				remove: 'Supprimer des items',
				removeDisabled: 'Pas d\'items'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: 'Cliquer et glisser pour editer',
					subtext: 'Cliquer annuler pour annuler les changements'
				}
			},
			remove: {
				tooltip: {
					text: 'Cliquer sur un item pour le supprimer'
				}
			}
		}
	}
};
*/