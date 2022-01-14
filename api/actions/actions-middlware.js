// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    const {id} = req.params
    const success = await Action.get(id)

    if (!success) res.status(404).json({ message: `Action with id ${id}` })
    
    else {
        req.actions = success
        next()
    } 
}

module.exports = {validateActionId}