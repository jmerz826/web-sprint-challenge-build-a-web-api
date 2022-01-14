const Project = require('./projects-model')

// Checks that project with passed in ID exists
async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            //if project with specified ID does not exist, respond with fail message
            res.status(404).json({message: `project with id ${req.params.id} not found`})
        } else { // project with specified exists
            req.project = project 
            next() //continue
        }
    } catch (err) {
        next(err) // continue to default fail catch in server file
    }
}

// Verifies that required fields for a project are present in request
function validateNewProject(req, res, next) {
    const { name, description, completed } = req.body

    // if any of the required fields are not present or filled out correctly
    if (!name || !name.trim() || !description || !description.trim() || completed === undefined) {
        // respond with fail status and fail message
        res.status(400).json({message: 'name, description, and completion status are required for new project'})
    } else {
        req.newProject = {name, description, completed}
        next() // continue
    }
}

module.exports = {validateProjectId, validateNewProject}