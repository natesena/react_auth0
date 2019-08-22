const
    VisitorCTRL = require('../Controllers/VisitorController.js')
    express = require('express')
    VisitorRouter = new express.Router()

VisitorRouter.route('/')
    .get(VisitorCTRL.find)

module.exports = VisitorRouter