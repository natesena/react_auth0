const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const jwt = require('express-jwt');//From auth-0 Page
const jwksRsa = require('jwks-rsa');

const app = express()

//fake DB for now
const questions = []

//middleware
app.use(helmet) //configure headers for security
app.use(bodyParser.json()) //change request data to JSON
app.use(cors()) //Accept all requests
app.use(morgan('combined')) //log http requests...

//Request options here without a proper set of routes

//get all questions
app.get('/',(req,res)=>{
    const allqs = questions.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers.length,
    }))
    res.send(allqs)
})

//Must be after GET endpoints...?
//This can be considered a middleware
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

//post a question
//Check JWT before you can post
app.post('/post', checkJwt, (req,res)=>{
    const {title, body} = req.body
    const newQuestion = {
        id: questions.length + 1,
        author: req.user.name,//If logged in with JWT this will have a username
        title,
        description,
        answers: []
    }
    questions.push(newQuestion)
    res.status(200).send
})

app.listen(8081, ()=>{
    console.log("listening on PORT 8081")
})