const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())

server.use('/api/projects', projectsRouter)

server.use((err, req, res, next) => {
    res.status(500).json({message: err.message})
})

module.exports = server;
