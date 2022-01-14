// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({message: `project with id ${req.params.id} not found`})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        next(err)
    }
}

function validateNewProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim() || !description || !description.trim() || completed === undefined) {
        res.status(400).json({message: 'name, description, and completion status are required for new project'})
    } else {
        req.newProject = {name, description, completed}
        next()
    }
}

module.exports = {validateProjectId, validateNewProject}