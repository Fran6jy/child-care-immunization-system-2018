// Publication copy: use a local database by default; override via MONGODB_URI.
module.exports = { dbURL: process.env.MONGODB_URI || require('./development.json').dbURL };
