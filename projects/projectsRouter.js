const express = require('express');
const db = require('../data/helpers/projectModel');

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

// DELETE project
router.delete('/:id', validateProjectId, (req, res) =>{
    db.remove(req.params.id)
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(error =>{
        console.log(error =>{
            res.status(500).json({
                errorMessage: 'There was a problem removing project'
            })
        })
    })
});

// UPDATE project 
router.put('/:id', validateProjectId, (req,res) => {
    db.update(req.params.id, {
        name:req.body.name,
        description: req.body.description
    })
    .then(project =>{
        if(!req.body.name || !req.body.description){
            res.status(400).json({
                message: 'You must provide a name and description'
            })
        }else{
            res.status(200).json(project)
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            errorMessage: 'Project was not able to be updated'
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