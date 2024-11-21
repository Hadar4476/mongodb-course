// INDEXES

// WHAT ARE INDEXES?
// indexes can speed up FIND, UPDATE & DELETE queries that match some criteria.

// ISSUE
// when trying to find a document inside a collection with "db.someCollection.find({name: "SOME NAME"})"
// MongoDB is running a COLLECTION SCAN, scan all documents and look for a matching "name" - which can take a while.

// WHY USE INDEXES?
// indexes can solve the ISSUE above, indexes are not considered a new collection but an addition to it.
// you can use an index for a field in a document like "name", which will hold an ordered list of all values of "name" inside all documents.
// it does not just a list of values, because each value have a pointer to the whole document it belongs to.
// after creating that index, MongoDB will do an INDEX SCAN, instead of looping through all documents, it searched by the index list
// and jumps straight to the related docuemnt.
// this can improve perfomance of FIND queries because it speed that up.

// WHEN NOT TO USE?
// setting up too many fields of the document as indexes can cost performance on inserts because
// if there are multiple indexes of a document that needs to be maintained, they also need to be updated on every insert.

// HOW TO CREATE AN INDEX?
// by running "db.someCollection.createIndex({ name : 1 })"
// the number after the field name determines if the order of the index list:
// ASC: 1
// DESC: -1

// HOW TO DELETE AN INDEX?
// by running "db.someCollection.dropIndex({ name: 1 })"

// COMPOUND INDEX
// you can also give an index multiple values, so it is not a seperate index list but one index list with 2 fields.
// by running "db.someCollection.createIndex({ "info.age": 1, name: 1 })"

// SORTING
// using ".sort" when trying to find documents is better with index because the is already sorted.
// using ".sort" without indexes can lead to timeouts on large collection because of performance issues.

// HOW TO GET ALL INDEXES OF COLLECTION?
// by running "db.someCollection.getIndexes()"

// UNIQUE INDEX
// by running "db.someCollection.createIndex({email: 1}, {unique: true})"

// PARTIAL INDEX
// with using indexes MongoDB stores all documents in an index list, but what if I just want to narrow it down?
// you can use PARTIAL INDEX to optimize the scanning by running "db.someCollection.createIndex({ "title": 1 }, { partialFilterExpression: { "isSportyArticle": true }})"
// this will create an index list but only for "isSportyArticle: true" documents but now when finding a document it should look like this:
// "db.someCollection.find({ title: "SOME_TITLE", isSportyArticle: true })" because if not MongoDB will execute a COLLECTION SCAN instead of
// INDEX SCAN because it wants to make sure you don't lose any data by default.

// WHAT IS THE DIFFERENCE BETWEEN COMPOUND AND PARTIAL INDEX?
// it is in the size of the PARTIAL INDEX which stores only specific fields with an option of filtering - better for performance.
// this is also depends on the scenario for the data we want to get.

// UNIQUE PARTIAL INDEX
// by running "db.someCollection.createIndex({email: 1}, {unique: true})" a unique index for the email field is created.
// now, lets say I don't enforce the email to be present in the document. what will happen if I insert 2 documents with no email?
// I will get an error because MongoDB will treat that "email: null" as unique and if it is present in another document it is considred
// a duplicate key error.
// for this a PARTIAL INDEX can be handy by running "db.someCollection.createIndex({}, { unique: true, partialFilterExpression: { email: {$exists} } })"
// this will create an index only if the "email" field is not null.

// TIME-TO-LIVE INDEX(TTL) - DATA CLEANUP
// this index can work only on a single field, which have to be a DATE type like createdAt or updatedAt and can't work with COMPOUND INDEX.
// what it does is deleting a document after a certain time and it works by running "db.someCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 })"
// this will all documents after 10 seconds.
// it can be good for sessions or carts cleanups.

// COVERED QUERIES - OPTIMIZED QUERIES WITH INDEXES
// when an index is created, it stores a pointer to the whole document and when running "db.someCollection.find({ "SOME_FIELD": "SOME_VALUE" })"
// MongoDB examine the whole document and returns it, you can see this by running "db.someCollection.explain("executionStats").find({ "SOME_FIELD": "SOME_VALUE" })"
// there you get an explanation about the query, you can see that MongoDB examined the whole document with at "totalDocsExamined" field.
// there is a way to optimize the queries to retrieve only the desired field's value by running
// "db.someCollection.explain("executionStats").find({ "SOME_FIELD": "SOME_VALUE" }, { _id: 0, "SOME_FIELD": 1})" this will prevent the whole document examation
// and will return only the field which is indexed.
