const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

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

//post a question
app.post('/post', (req,res)=>{
    const {title, body} = req.body
    const newQuestion = {
        id: questions.length + 1,
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