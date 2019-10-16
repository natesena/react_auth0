const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

//express-jwt
//connect/express middleware that validates a JsonWebToken (JWT) and set the req.user with the attributes
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://nsena.auth0.com/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://nsena.auth0.com/`,
  algorithms: ["RS256"]
});

module.exports = checkJwt;
