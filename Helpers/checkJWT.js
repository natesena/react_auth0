const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://nsena.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'eGMRjroJZpn8MlzshPcSXhqpQAK8iGlp',
    issuer: `https://nsena.auth0.com/`,
    algorithms: ['RS256']
  });


module.exports = checkJwt