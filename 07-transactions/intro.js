// What are transactions?
// a way to solve an issue when one action you want to execute success, the other fails and they
// are bound to each other but still the program continues as normal.
// if you want the action which was succeeded to fail too, you should use transactions.
// example for actions: a deletion of a user in users collections should also delete his related posts in the posts collection.
// transactions also do a rollback to all actions if one of the actions has failed.

// How to create a transaction?
// a transaction needs a session, you create a session by running "db.getMongo().startSession()"
// this can be stored in a constant which can be worked with: "const session = db.getMongo().startSession()"
// then you need to start the transaction on the session with running "session.startTransaction()"
// now you need to access your collection through the transaction:
// const SOME_COLLECTION = session.getDatabase("SOME_DATABASE").SOME_COLLECTION
// const SOME_OTHER_COLLECTION = session.getDatabase("SOME_DATABASE").SOME_OTHER_COLLECTION
// any action you will do on the collection, for example deleteOne, will not execute immedietly.
// this means, if you run find after deletion you will still see the document.
// to commit all the changes you did which depend on the success of each other you can run
// "session.commitTransaction()" which will run the automatic process of ensuring everything has been executed
// successfully and if not, a rollback is made.
