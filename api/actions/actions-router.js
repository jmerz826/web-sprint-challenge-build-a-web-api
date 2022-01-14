// Write your "actions" router here!
const express = require('express')
const router = express.Router()

const Action = require('./actions-model')

const {validateActionId, validateNewAction} = require('./actions-middlware')

router.get('/', async (req, res, next) => {
    const actions = await Action.get()

    if (!actions) next()
        
    else res.status(200).json(actions)
})

router.get('/:id', validateActionId, (req, res, next) => {
    try {
        res.status(200).json(req.actions)
    } catch {
        next()
    }
})

router.post('/', validateNewAction, (req, res, next) => {
    Action.insert(req.newAction)
        .then(added => {
            res.status(200).json(added)
        })
        .catch(err => next(err))
})

module.exports = router