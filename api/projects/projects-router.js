// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Project = require('./projects-model')

const {validateProjectId} = require('./projects-middleware')


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

module.exports = router