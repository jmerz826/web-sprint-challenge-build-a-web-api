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

module.exports = {validateProjectId}