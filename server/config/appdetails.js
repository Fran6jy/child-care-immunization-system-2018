// Publication copy: load the JWT signing secret from the local environment.
if (!process.env.JWT_SECRET) {
  throw new Error('Set JWT_SECRET before starting the server');
}
module.exports = { jwtSecret: process.env.JWT_SECRET };
