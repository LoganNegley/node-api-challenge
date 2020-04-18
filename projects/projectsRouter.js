const express = require('express');
const db = require('../data/helpers/projectModel');
const actionsDB = require('../data/helpers/actionModel')

const router = express.Router();


// GET all projects
router.get('/', (req, res) =>{
    db.get()
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            errorMessage: 'The projects could not be received'
        })
    })
});

// GET project with ID
router.get('/:id', validateProjectId, (req, res) =>{
    db.get()
    .then(project =>{
        res.status(200).json(req.project)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            errorMessage: 'Was not able to retreived project with that ID'
        })
    })
});

// GET caction with project ID
router.get('/:id/actions', validateProjectId, (req, res) =>{
    actionsDB.get()
    .then(actions =>{
        res.status(200).json(actions)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            errorMessage: 'Was not able to retreived actions for project'
        })
    })
});

// ADD a project
router.post('/', (req, res) =>{
        if(!req.body.name || !req.body.description){
        res.status(400).json({
            errorMessage: 'Please provide name and description'
        })
        }
    db.insert(req.body)

    .then(project =>{
            res.status(201).json(project)
        })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            errorMessage:'Error creating new project'
        })
    })
});







// Custom middleware
function validateProjectId (req, res, next){
    const { id } = req.params;
    db.get(id)
    .then(project =>{
        if(project){
            req.project = project
            next()
        }else{
            res.status(404).json({
                message: 'Project with that Id was not found'
            })
        }
    })
    .catch(error =>{
        res.status(500).json({
            errorMessage: 'Failed request with project with that ID'
        })
    })
};


module.exports = router;