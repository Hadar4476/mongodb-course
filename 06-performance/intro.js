// What Influences Performance?
// - Efficient queries/opertaions
// - Indexes
// - Fitting data schema
// - Hardware & network
// - Sharding
// - Replicate sets

// How To Improve Performance?

// CAPPED COLLECTION
// lets say you have a collection for storing logs which should not hold all the potential logs.
// you can cap the collection with a maximum number of documents it should hold.
// by running "db.createCollection("SOME_COLLECTION_NAME", { capped:true, size: 10000, max: 3})"
// the size is required here and represents the bytes amount.
// the max represents the amount of maximum documents it should store.
// following the example above, inserting a 4th document will result in replacing the first inserted docuemnt(FIFO).

// REPLICA SETS
// replica set is a group of nodes which are basically MongoDB servers.
// they share data asyncrounsly by a primary node.
// if that primary node turns offline for some reason, a secondary node will take its place.
// it is good for backup and read performance.
// it improved read performance in situations when you want to fetch a large amount of data from the database
// and get this data from 2 seperate nodes which can speed up the process.

// What is Sharding?
// sharding and replicate sets are not the same.
// sharding is horizontal scaling for your MongoDB data.

// What is Horizontal Scaling?
// when one server is not enough for serving the data, you can multiply it and lower the performance cost
// on one server by sharing it with multiple servers.
// the servers work together to serve the data and don't work as stand-alones.
// each can provide a chunk of that distributed data(not replicated data).
// important to understand is that the queries you write should run for all servers.

// How Queries can point to the right server?
// with a router of MongoDB called mongos which points the query to the right server by a shard key.
// a shard key is something that is attached to each document and connect a document to a shard/server.
// it is important to attach the shard key to the query because Mongo won't know which shard/server to access
// and will make a call for every shard to check if it hold the data.

// MonboDB Atlas
// a solution for automatic setup when publishing a Mongo database.
// because if you will have to publish it manually you will need to take care of alot of things which are beyond
// the scope of development.
// things like security, shards, replica sets, encryption, backup, software updates and etc.
