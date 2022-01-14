const Action = require('./actions-model')
const Project = require('../projects/projects-model')

async function validateActionId(req, res, next) {
    const { id } = req.params
    
    // fetch action with passed in ID
    const success = await Action.get(id)

    // returns 404 status if action with specified ID does not exist
    if (!success) res.status(404).json({ message: `Action with id ${id}` })
    
    else {
        req.action = success // Sets req.action to the action with ID passed in
        next() // continue
    } 
}

async function validateNewAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body

    // check if the project with specified project_id actually exists
    const project = await Project.get(project_id) 

    // reuturn 404 if project with project_id does not exist
    if (!project) res.status(404).json({ message: `Cannot find project with id of ${project_id}` })
    else {
        // new action must contain a description, notes, and either true or false for 'completed'
        // if any of these criteria aren't met, return 400 status
        if (!description || !description.trim() || !notes || !notes.trim() || completed === undefined) {
            res.status(400).json({message: 'description, notes, and completion status are required'})
        } else {
            req.newAction = {project_id, description, notes, completed}
            next() // continue
        }
    }
}

module.exports = {validateActionId, validateNewAction}