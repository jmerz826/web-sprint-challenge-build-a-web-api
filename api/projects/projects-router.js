const express = require('express')
const router = express.Router()
const Project = require('./projects-model')
const {validateProjectId, validateNewProject} = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            if (!projects || projects.length === 0) {
                // responds with empty array if no projects fetched
                res.status(404).json([])
            } else {
                res.status(200).json(projects) // responds with projects array
            }
        })
        .catch(() => next()) // continue to default fail catch in server file
})

router.get('/:id', validateProjectId, (req, res, next) => {
    try {
        res.status(200).json(req.project) // respond with project with specified ID
    } catch {
        next() // continue to default fail catch in server file
    }
})

router.post('/', validateNewProject, async (req, res, next) => {
    // Attempt to add new project request to projects array in database
    const success = await Project.insert(req.newProject)

    if (!success) { //if attempt is unsuccessful
        next() // continue to default fail catch in server file
    } else { // successful attempt
        res.status(201).json(success) // respond with new project
    }
})

router.put('/:id', validateProjectId, validateNewProject, async (req, res, next) => {
    // Attempt to update a project in the projects array in database
    const success = await Project.update(req.params.id, req.newProject)

    if (!success) next() // continue to default fail catch in server file
    else res.status(200).json(success) // respond with updated project
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    const { id } = req.params
    Project.remove(id)
        // if specified project removed successfully 
        .then(() => {
            res.status(200).json({message: `Project with id ${id} removed successfully`}) 
        })
        // if specified project cannot be removed
        .catch(() => next()) // continue to default fail catch in server file
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions) // respond with actions associated with specified project
        })
        .catch(() => next()) // continue to default fail catch in server file
})

module.exports = router