// SECURITY

// AUTHENTICATION & AUTHORIZATION
// in MongoDB you can create users and set relative roles to them so each user
// will have a different permission to interact with your data in the database.

// ADMIN USER
// to create a general admin user which can create other users there are few steps needed:
// - make sure in your C:\Program Files\MongoDB\Server\8.0\bin -> mongod.cfg, authorization is enabled
// - you can enable the authorization under "security" like this:
//                                            security:
//                                               authorization: "enabled";
// - next you need to create that user
// - open mongo shell(mongosh)
// - run "use admin"
// - run db.createUser({
//           user: "adminUser",
//           pwd: "securePassword", // Use a strong password
//           roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
//           })
// - authenticate the user with running "db.auth("adminUser", "securePassword")"
// - now you can go the another database, create a user there and set its relative roles("readWrite", "dbAdmin", "read" etc.).

// SSL SECURITY
// can be taken care of by Mongo Atlas.
