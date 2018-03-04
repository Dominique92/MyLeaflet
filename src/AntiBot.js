/*
 * Copyright (c) 2014 Dominique Cavailhez
 * N'active Leaflet pas si l'agent est un robot
 */

if (navigator.userAgent.search (/arach|archiver|bot|crawl|curl|factory|googlebot|index|partner|robot|rss|scoot|search|seek|semantic|spider|spyder|yandex/i) != -1)
	L.Map.prototype.addLayer = function () {}
