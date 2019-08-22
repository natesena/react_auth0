const
    VisitorCTRL = require('../Controllers/VisitorController.js')
    express = require('express')
    VisitorRouter = new express.Router()

VisitorRouter.route('/')
    .post(VisitorCTRL.find)

module.exports = VisitorRouter