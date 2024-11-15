// MongoDB have a configuration option for inserting documents.
// inserting is done when the client(mongodb shell) is communicating with the mongodb server(mongod).
// we have 3 options for inserting documents: insertOne, insertMany & insert.
// insert is considered bad practice because it does not specify the operation and is too dynamic.

// after inserting the data is being processed by the STORAGE ENGINE.
// the STORAGE ENGINE is storing the data in DISC and also manages the data in MEMORY because it is faster to process.
// it also can store a file on the DISC which is called JOURNAL, this file is baisically a "todo" list for telling the storage engine
// about operations which are not completed yet.
// it also good for backing up files because if the server shuts down or some data in MEMORY is lost the JOURNAL file is still in DISC.

// example for configuring an operation in JOURNAL:
// db.someCollection.insertOne({ name: "SOME NAME", description: "SOME DESCRIPTION" }, { writeConcert: { w:1, j: true }}).
// "w" is making sure the wait for the server to acknowledge the operation.
// "j" is for writing that operation to the STORAGE ENGINE(by default it is undefined).
// this approach is very good for security because you also make sure the server completed both the operation and saving it in JOURNAL.
