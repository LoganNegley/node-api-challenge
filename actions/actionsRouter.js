const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();


// GET caction with project ID
router.get('/:id/actions', validateProjectId, (req, res) =>{
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


module.exports.router;