// One-time bootstrap for a local study database. Never use real patient data here.
var uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/immu';
if (!/^mongodb:\/\/(127\.0\.0\.1|localhost)(:|\/)/.test(uri)) {
  throw new Error('This seed script only supports a localhost MongoDB URI');
}
var email = process.env.SEED_ADMIN_EMAIL;
var password = process.env.SEED_ADMIN_PASSWORD;
if (!email || !password) {
  throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD first');
}
var mongoose = require('../config/mongoose');
var Admin = require('../models/adminModel');
var bcrypt = require('bcrypt');
bcrypt.hash(password, 10, function (error, hash) {
  if (error) { console.error(error); process.exit(1); }
  Admin.findOne({ email: email }).then(function (existing) {
    if (existing) { throw new Error('Admin already exists: ' + email); }
    return Admin.create({ fullName: 'Local Demo Administrator', email: email, password: hash });
  }).then(function () {
    console.log('Local demo admin created: ' + email);
    mongoose.disconnect();
  }).catch(function (error) {
    console.error(error.message);
    mongoose.disconnect();
    process.exitCode = 1;
  });
});
