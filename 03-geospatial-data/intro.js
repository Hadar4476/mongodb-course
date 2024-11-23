// GEOSPATIAL DATA
// a way to create document which contains coordinates and is understandable by MongoDB.
// by running "db.someCollection.insertOne({ "SOME_FIELD": "SOME_VALUE",  "SOME_OTHER_FIELD": { type: "Point", coordinates: ["LONG_VALUE", "LAT_VALUE"]}})"

// GEOSPATIAL QUERIES

// FIND PLACES NEAR LOCATION
// to use this query you need a GEOSPATIAL INDEX.
// by running "db.someCollection.createIndex({"SOME_FIELD": "2dsphere"})".
// by running "db.someCollection.find({"SOME_OTHER_FIELD": {$near: {$geometry: { type: "Point", coordinates: ["LONG_VALUE", "LAT_VALUE"] }}}})".

// FIND PLACES NEAR LOCATION AND SET DISTANCE
// by running "db.someCollection.find({"SOME_OTHER_FIELD": {$near: {$geometry: { type: "Point", coordinates: ["LONG_VALUE", "LAT_VALUE"] }, $maxDistance: "SOME_METER_VALUE", $minDistance: "SOME_METER_VALUE"}}})"

// FIND POINTS OF AN AREA
// treat P1(etc) as coordinates array, for example:
// const P1 = ["SOME_LONG_VALUE", "SOME_LAT_VALUE"]
// you can find points of an area by passing an array of coordinates.
// run "db.someCollection.find({ $location: {$geoWithin: { type: "Polygon", coordinates: [[P1, P2, P3, P4, P5]] }}})"

// FIND A LOCATION INSIDE AN AREA
// when you have an area in your database which you want to check if a location is in that area.
// for this you also need to create a GEOSPATIAL INDEX.
// by running "db.someCollection.find({"SOME_FIELD": { $geoIntersects: { $geometry: { $type: "POINT", coordinates: ["SOME_LONG_VALUE", "SOME_LAT_VALUE"]}}}})"

// FIND PLACES WITHIN RADIUS
// to use this query you need a GEOSPATIAL INDEX.
// by running "db.someCollection.find({"SOME_FIELD": {$geoWithin: { $centerSphere: [["SOME_LANG_VALUE", "SOME_LAT_VALUE"], 1 / 6378.1]}}})"
// the value after the coordinates array is the radius
// kilometers value is 6378.1
// 1 / 6378.1 is equal to 1 kilometer
