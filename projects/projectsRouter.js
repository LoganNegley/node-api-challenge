const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();


// GET all projects
router.get('/')







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
                message: 'Project Id was not found'
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