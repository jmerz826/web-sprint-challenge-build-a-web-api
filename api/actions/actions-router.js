// Write your "actions" router here!
const express = require('express')
const router = express.Router()

const Action = require('./actions-model')

router.get('/', async (req, res, next) => {
    const actions = await Action.get()

    if (!actions) next()
        
    else res.status(200).json(actions)
})

module.exports = router