const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

//express-jwt
//connect/express middleware that validates a JsonWebToken (JWT) and set the req.user with the attributes
//passes request, header, and payload to jwksRsa

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
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

// const checkJwt = (req, res, next) => {
//   // console.log("req", req);
//   jwt({
//     // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://nsena.auth0.com/.well-known/jwks.json`
//     }),
//     // Validate the audience and the issuer.
//     audience: process.env.AUTH0_CLIENT_ID,
//     issuer: `https://nsena.auth0.com/`,
//     algorithms: ["RS256"]
//   });
//   console.log("checkJWT res: ", res);
//   next();
// };

module.exports = checkJwt;
