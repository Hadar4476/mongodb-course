// AGGREGATION

// WHAT IS AGGREGATION?
// a series of actions which each depends on the outcome of the previous action, a pipeline.
// with aggregation you can manipulate and costume the data.

// AGGREGATE METHOD
// executing aggregation is done with the aggregate method like by running "db.someCollection.aggregate([])"
// this method take an array of actions.

// AGGREGATE $match
// you can pass the "$match" to aggregate as first item to tell which items you want to filter.
// db.someCollection.aggregate([
//      { $match: { "SOME_FIELD": "SOME_VALUE" }}
// ])

// AGGREGATE $group
// after filtering you can group the data by a certain field which you give to "_id" and create a new field.
// you point to the field you want to group by with "$", so "$SOME_FIELD" will get the value and gorup by it.
// this will look at the whole documents which shares the same value of "$SOME_FIELD" and group them up.
// you can also create a new field with aggregating which will hold a certain value related to that grouping, like a summary with "$sum"
// db.someCollection.aggregate([
//      { $match: { "SOME_FIELD": "SOME_VALUE" }},
//      { $group: { _id: "$SOME_FIELD", "SOME_TOTAL_FIELD": { $sum: 1 }}},
// ])

// AGGREGATE $sort
// after grouping you can sort your results as an action inside aggreagte.
// in this example its desc way of sorting.
// db.someCollection.aggregate([
//      { $match: { "SOME_FIELD": "SOME_VALUE" }},
//      { $group: { _id: "$SOME_FIELD", "SOME_TOTAL_FIELD": { $sum: 1 }}},
//      { $sort: { "SOME_TOTAL_FIELD": -1 }},
// ])

// AGGREGATE $project
// a way to transform the data which should be retreived.
// setting value of 0 means its should be excluded.
// setting value of 1 means its should be included.
// you can also add new fields and if you want to assign values from the document you use "$SOME_FIELD"
// db.someCollection.aggregate([
//  { $project: { _id: 0, "SOME_FIELD": 1, "SOME_NEW_FIELD": "SOME_VALUE"}}
// ])

// AGGREGATE $push
// when you want to push an element to an array you can use it with $group
// db.someCollection.aggregate([
//      { $group: { _id: "$SOME_FIELD", "SOME_NEW_FIELD": { $push: "SOME_VALUE" }}}
// ])

// AGGREGATE $unwind
// pulls items from an array and grouping them with $group
// db.someCollection.aggregate([
//      { $unwind: "$SOME_ARRAY_FIELD"},
//      { $group: { _id: "$SOME_FIELD", "SOME_NEW_FIELD": { $push: "SOME_VALUE" }}},
// ])

// REMOVE DUPLICATE VALUES
// when you want unique values in your array you can use $addToSet
// db.someCollection.aggregate([
//      { $unwind: "$SOME_ARRAY_FIELD"},
//      { $group: { _id: "$SOME_FIELD", "SOME_NEW_FIELD": { $addToSet: "SOME_VALUE" }}},
// ])

// AGGREGATE $bucket
// this operation is a way for grouping data in categories.
// you define the range for these categories with "boundaries".
// you define how each category document should look like with "output".
// db.someCollection.aggregate([
//   {
//     $bucket: {
//       groupBy: "$SOME_FIELD",
//       boundaries: "SOME_ARRAY_WITH_NUMBERIC_VALUES",
//       output: {
//         SOME_FIELD: "SOME_VALUE",
//         SOME_OTHER_FIELD: "SOME_OTHER_VALUE",
//       },
//     },
//   },
// ]);

// AGGREGATE $bucketAuto
// works a but different than $bucket because it sets the boundaries automatically.
// the "buckets" key will be treated as a divider for 5 documents.
// db.someCollection.aggregate([
//   {
//     $bucketAuto: {
//       groupBy: "$SOME_FIELD",
//       buckets: 5,
//       output: {
//         SOME_FIELD: "SOME_VALUE",
//         SOME_OTHER_FIELD: "SOME_OTHER_VALUE",
//       },
//     },
//   },
// ]);

// HOW TO WRITE AN AGGREGATE RESULT TO A NEW COLLECTION? $out
// using the $out with a specified string will result in creating a new collection with that string as a name.
// db.someCollection.aggregate([
//      { $match: { "SOME_FIELD": "SOME_VALUE" }},
//      { $group: { _id: "$SOME_FIELD", "SOME_TOTAL_FIELD": { $sum: 1 }}},
//      { $sort: { "SOME_TOTAL_FIELD": -1 }},
//      { $out: "SOME_NEW_COLLECTION"},
// ])
