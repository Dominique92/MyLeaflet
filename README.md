Dominique92.MyLeaflet
=====================

Leaflet extensions for
* multi vendors maps &amp; projections:
```
- IGN France
- SwissTopo
- IDEE España
- IGM Italie
```
* geoJSON ajax markers,
* editable position marker with multi-projection position display,
* Polylines editor.

SOURCES
=======
Ce répertoire est composé de:
* leafletjs.com & github.com contiennent les sources du kernel Leaflet et de pluggins.
Un fichier CREDIT.txt à la base de chacun des sous-répertoires donne l'origine du pluggin et la version.
Bien que très peu servent, la totalité des fichiers d'origine de chaque plugin a été conservée sauf les fichiers docs, examples, spec & test, ceux dont le nom commence par un . et les répertoires vides.
De très rares modifications sont signalées dans ces fichiers par le tag "GEO", "GEOoptim" ou "GEOmin".
* /src/... contient les sources originales des fonctions non encore disponibles en plugin Leaflet (c) 2014, Dominique Cavailhez
* /src/leaflet.css /src/leaflet.js : listent les fichiers sources: On peut inclure ces fichiers pour le debug et ils servent liste des fichiers à compresser pour la distribution.
* /build/... : Génération des fichiers compressés de distribution.
* /dist/... : une fois exacuté build/index.php, dist contient les fichiers autosuffisants et compressés à recopier sur votre site. Ne pas modifier ces fichiers: ils sont régénérés par /build
* /index.php : demo et test.

DEMO
====
[See a DEMO](http://dominique92.github.io/MyLeaflet/)
