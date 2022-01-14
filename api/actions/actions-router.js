// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Action = require('./actions-model')
const {validateActionId, validateNewAction} = require('./actions-middlware')

router.get('/', async (req, res, next) => {
    const actions = await Action.get()

    if (!actions) next() // if no actions returned, continue to default fail catch in server file
    else res.status(200).json(actions) // respond with array of actions
})

router.get('/:id', validateActionId, (req, res, next) => {
    try {
        res.status(200).json(req.action) // responds with action with passed in ID
    } catch {
        next() // continue to default fail catch in server file
    }
})

router.post('/', validateNewAction, (req, res, next) => {
    Action.insert(req.newAction)
        .then(added => {
            res.status(200).json(added) // respond with newly created action
        })
        .catch(() => next()) // continue to default fail catch in server file
})

router.put('/:id', validateActionId, validateNewAction, (req, res, next) => {
    Action.update(req.params.id, req.newAction)
        .then(updated => {
            res.status(200).json(updated) // responds with updated action
        })
        .catch(() => next()) // continue to default fail catch in server file
})

router.delete('/:id', validateActionId, (req, res, next) => {
    const {id} = req.params
    Action.remove(id)
        .then(() => {
            // respond with success message
            res.status(200).json({message: `Action with id ${id} deleted successfully`})
        })
        .catch(() => next()) // continue to default fail catch in server file
})

module.exports = router