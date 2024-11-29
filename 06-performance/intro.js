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
