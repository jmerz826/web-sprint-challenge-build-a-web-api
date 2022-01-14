// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Project = require('./projects-model')


router.get('/', (req, res, next) => {
    console.log('projects')
    Project.get()
        .then(projects => {
            if (!projects || projects.length === 0) {
                res.status(404)
            } else {
                res.status(200).json(projects)
            }
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router