// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Project = require('./projects-model')

const {validateProjectId, validateNewProject} = require('./projects-middleware')


router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            if (!projects || projects.length === 0) {
                res.status(404).json([])
            } else {
                res.status(200).json(projects)
            }
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project)
})

router.post('/', validateNewProject, async (req, res, next) => {
    const {newProject} = req
    const success = await Project.insert(newProject)
    if (!success) {
        next()
    } else {
        res.status(201).json(success)
    }
})

router.put('/:id', validateProjectId, validateNewProject, async (req, res, next) => {
    const success = await Project.update(req.params.id, req.newProject)
    if (!success) {
        next()
    } else {
        res.status(200).json(success)
    }
})

module.exports = router