require('dotenv').config()

const server = require('./api/server') // import server

const PORT = process.env.PORT || 9000 // Uses port # specified in env, or defaults to 9000 if not specified

// activate server
server.listen(PORT, () => {
    console.log(`the server is listening on port ${PORT}`)
})