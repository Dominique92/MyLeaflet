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
- Libres: OSM, Thunder Forest
- Bing Microsoft
- Google maps
- MapQuest AOL
```
* geoJSON ajax layers,
* editable position marker with multi-projection position display,
* Polylines editor.

DEMO
====
[See a DEMO](http://dominique92.github.io/MyLeaflet/)

SOURCES
=======
Ce répertoire est composé de:
/github.com/... : sources utilisés du kernel Leaflet et de plugins.
Un fichier CREDIT.txt à la base de chacun des sous-répertoires donne l'origine du pluggin et la version.
De très rares modifications sont signalées dans ces fichiers par le tag "GEO", "GEO optimisation" ou "GEOmin".
* /src/... : sources originales des fonctions non encore disponibles en plugin.
* /src/leaflet.css /src/leaflet.js : listent les fichiers sources: On peut inclure ces fichiers pour le debug et ils servent liste des fichiers à compresser pour la distribution.
* /src/libs/... : Fichiers issus ou complètant des librairies externes.
* /libs/... : Autres librairies externes.
* /build/... : Génération des fichiers compressés de distribution.
* /examples/... : Examples et autres fichiers de test, développements ou évaluations en cours.
* /dist/... : les fichiers autosuffisants et compressés à recopier sur votre site et un examplaire de chaque source. Ne pas modifier ces fichiers: ils sont régénérés par /build
* /index.php : demo et test.
