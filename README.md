Dominique92.MyLeaflet
=====================

Leaflet extensions for
* multi vendors maps &amp; projections:
```
- IGN France
- SwissTopo
- IDEE España
- IGM Italie
- OS Great Britain
- Kompass Austria
- Libres: OSM, Maps.Refuges.Info, Thunder Forest, Hihe & Bike, ClycleMap, Outdoors & Bike, ClycleMap, 
- Bing Microsoft
- Google maps
```
* GeoJson ajax layers,
* Editable position marker with multi-projection position display,
* Markers, polylines & polugons editor.

DEMO
====
[See a DEMO](http://dominique92.github.io/MyLeaflet/)

SOURCES
=======
Ce répertoire est composé de:
* /build/... : Récupération des plugins importés & génération des fichiers compressés de distribution.
* /dist/... : Fichiers autosuffisants et compressés à recopier sur votre site et un examplaire de chaque source.
Ne pas modifier ces fichiers: ils sont régénérés par /build
* /dist/src/... : Copie des sources compressés dans /dist/leaflet.js.
Pour info et debug, inutilisés en production.
* /github.com/... : Copie des sources utilisés du kernel Leaflet et de plugins.
Un fichier CREDIT.txt à la base de chacun des sous-répertoires donne l'origine du pluggin et la version.
De très rares modifications sont signalées dans ces fichiers par le tag "GEO", "GEO optimisation" ou "GEOmin".
* /libs/... : Autres librairies externes.
* /github.com/Dominique92/... : Originaux des sources de mes plugins. Sont également disponibles sous forme de plugins séparés.
* /src/... : Sources originaux des fonctions non encore disponibles en plugin.
* /src/leaflet.css /src/leaflet.js : Liste des fichiers sources: On peut inclure ces fichiers pour le debug et ils servent liste des fichiers à compresser pour la distribution.
* /src/libs/... : Fichiers issus ou complètant des librairies externes.
* /test/... : Examples et autres fichiers de test, développements ou évaluations en cours.
* /index.php : demo et test.

Inclusion de la librairie en developpement (originaux des sources):
```html
	<link rel="stylesheet" href="/src/leaflet.css" />
	<script src="/src/leaflet.js"></script>
```

Inclusion de la librairie en production (fichiers compressés):
```html
	<link rel="stylesheet" href="/dist/leaflet.css" />
	<script src="/dist/leaflet.js"></script>
```

Inclusion de la librairie en debug sur site de production (copie des sources):
```html
	<link rel="stylesheet" href="/dist/src/leaflet.css" />
	<script src="/dist/src/leaflet.js"></script>
```
