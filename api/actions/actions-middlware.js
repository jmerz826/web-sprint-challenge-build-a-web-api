// add middlewares here related to actions
const Action = require('./actions-model')
const Project = require('../projects/projects-model')

async function validateActionId(req, res, next) {
    const {id} = req.params
    const success = await Action.get(id)

    if (!success) res.status(404).json({ message: `Action with id ${id}` })
    
    else {
        req.actions = success
        next()
    } 
}

async function validateNewAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body
    const project = await Project.get(project_id)

    if (!project) res.status(404).json({ message: `Cannot find project with id of ${project_id}` })
    else {
        if (!description || !description.trim() || !notes || !notes.trim() || completed === undefined) {
            res.status(400).json({message: 'description, notes, and completion status are required'})
        } else {
            req.newAction = {project_id, description, notes, completed}
            next()
        }
    }
}

module.exports = {validateActionId, validateNewAction}