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
// this is also depends on the scenario for the data you want to get.

// UNIQUE PARTIAL INDEX
// by running "db.someCollection.createIndex({email: 1}, {unique: true})" a unique index for the email field is created.
// now, lets say I don't enforce the email to be present in the document. what will happen if I insert 2 documents with no email?
// I will get an error because MongoDB will treat that "email: null" as unique and if it is present in another document it is considred
// a duplicate key error.
// for this a PARTIAL INDEX can be handy by running "db.someCollection.createIndex({}, { unique: true, partialFilterExpression: { email: {$exists} } })"
// this will create an index only if the "email" field is not null.

// TIME-TO-LIVE(TTL) INDEX - DATA CLEANUP
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

// MULTI KEY INDEX
// an index that hold all the values of a field of type array.
// by running "db.someCollection.explain("executionStats").find({"SOME_ARRAY_FIELD": "SOME_VALUE"})" there is a "isMultiKey: true" field.
// each value in the array is stored separately in the index list.
// if array contains only objects it is best to use a key of that object as an index because the index list will be large and cost more
// performance than it already is cost.
// you can't create a compound index of multiple arrays like this: db.someColllection.createIndex({"SOME_ARRAY": 1, "SOME_OTHER_ARRAY": 1})

// TEXT KEY INDEX - INTRO
// this type of index is good when you want to get data depending on a string which is a part of multiple strings like: description or large title.
// typically you will use regex with "db.collectionName.find({ "SOME_FIELD": { $regex: /<SOME_VALUE>/, $options: 'i' } })"
// you create a text index by running "db.someCollection.createIndex({"SOME_FIELD": "text"})" using "text" instead of 1 here is important.
// you find a result by running: "db.someCollection.find({ $text: { $search: "SOME_VALUE" }})", casing is not important as it stores the values in lowercase.
// when finding, you don't use the field name because text indexes are expensive for performance.
// if the "SOME_VALUE" contains more than 2 words, the index list will return results which contains each word separatley.
// if you want to get a whole string instead of treating each word separatley you can run
// "db.someCollection.find({ $text: { $search: "\"SOME_VALUE_WITH_MULTIPLE_WORDS"\" } })"

// TEXT KEY INDEX - SORTING
// lets say you get 2 results for using "db.someCollection.find({ $text: { $search: "SOME_VALUE SOME_OTHER_VALUE" } })" but the first result contain only "SOME_VALUE"
// and the second result contains both "SOME_VALUE" and "SOME_OTHER_VALUE", the second result should be prioritize, MongoDB gives a score to each result which is based on
// how much does that string match.
// you can use it for sorting by running
// "db.someCollection.find({ $text: { $search: "SOME_VALUE SOME_OTHER_VALUE" }}, { score: { $meta: "textScore" }}).sort({ score: { $meta: "textScore" }})"

// TEXT KEY INDEX - COMBINATION
// by running "db.someCollection.createIndex({ "SOME_FIELD": "text", "SOME_OTHER_FIELD": "text" })" you can create a text index for multiple fields.

// TEXT KEY INDEX - LANGUAGE
// when using the text index, MongoDB won't search for stop words like: "is", "a", "the" etc.
// this changes from language to language, so you can define the language for the text index by running
// "db.someCollection.createIndex({"SOME_FIELD": "text"}, {default_language: "english"})", there is a limit to the supported languages.
// English is the default and Hebrew is not supported.

// TEXT KEY INDEX - WEIGHT
// weight is a way to prioritize a field which is indexed with another another field.
// by running "db.someCollection.createIndex({"SOME_FIELD": "text", "SOME_OTHER_FIELD": "text"}, { weights: { "SOME_FIELD": 1, "SOME_OTHER_FIELD": 10 }})"
// this will make sure that that "SOME_OTHER_FIELD" is prioritize when finding.
// it also work with the scoring of MongoDB, see TEXT KEY INDEX - SORTING for more details.

// BUILDING INDEX IN PRODUCTION
// building indexes might take a while, for that you can run "db.someCollection.createIndex({ "SOME_FIELD": 1}, { background: true})"
// this will make sure that the process of inserting or reading won't depend on the creation of an index if the creation will take a while.
