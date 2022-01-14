const express = require('express')
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

// Create server
const server = express()
server.use(express.json())

// recognizes the two endpoints and re-directs server accordingly 
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

// DEFAULT CATCH FAIL, to be routinely accessed upon failure
server.use((err, req, res, next) => {
    res.status(500).json({message: 'request could not be completed'})
})

module.exports = server
