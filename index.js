const 
    PORT = 3001
    bodyParser = require('body-parser')
    express = require('express')
    cors = require('cors')
    helmet = require('helmet')
    morgan = require('morgan')
    mongoose = require('mongoose')
    dotenv = require('dotenv')
    PostRouter = require('./Routes/PostRoutes.js')
    checkJwt = require('./Helpers/checkJWT.js')

dotenv.config()

const app = express()

MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).
catch(err => 
    console.log(`error connecting to DB: ${err}, MONGODB_URI: ${MONGODB_URI}`)
)

let db = mongoose.connection
db.once('open', () => {
    console.log("DB connected")
});

//middleware
app.use(helmet()) //configure headers for security
app.use(bodyParser.json()) //change request data to JSON
app.use(cors()) //Accept all requests
app.use(morgan('combined')) //log http requests...
app.use('/api/Posts', PostRouter)

//Check JWT before you can post
// app.post('/post', checkJwt, (req,res)=>{
//     const {title, body} = req.body
//     const newQuestion = {
//         id: questions.length + 1,
//         author: req.user.name,//If logged in with JWT this will have a username
//         title,
//         description,
//         answers: []
//     }
//     questions.push(newQuestion)
//     res.status(200).send
// })

app.listen(PORT, (err)=>{
    console.log(err|| `listening on PORT ${PORT}`)
})