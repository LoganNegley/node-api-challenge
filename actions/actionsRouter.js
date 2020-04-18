const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();


// GET cactions by project ID
router.get('/:id', validateProjectId, (req, res) =>{
    db.get(req.params.id)
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

// GET all actions
router.get('/', (req,res)=>{
    db.get()
    .then(actions =>{
        res.status(200).json(actions)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error returning actions'
        })
    })
});

// Update an action to project
router.put('/:id', validateProjectId, (req,res) =>{
    
    db.update(req.params.id, req.body)
    .then(action =>{
        res.status(201).json(action)
    })
    .catch(error =>{
        errorMessage:"Error trying to update an action"
    })
});

// Delete action from project
router.delete('/:id', validateProjectId, (req, res) =>{
    db.remove(req.params.id)
    .then(action =>{
        res.status(200).json(action)
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            errorMessage:'Not able to delete action'
        })
    })
});




// Custom middleware
function validateProjectId (req, res, next){
    const { id } = req.params;
    db.get(id)
    .then(action =>{
        if(action){
            req.action = action
            next()
        }else{
            res.status(404).json({
                message: 'Action with that Id was not found'
            })
        }
    })
    .catch(error =>{
        res.status(500).json({
            errorMessage: 'Failed request with action with that ID'
        })
    })
};


module.exports = router;