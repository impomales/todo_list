 var express = require('express'),
     router = express.Router(), 
     db = require('../models');
     
router.get('/', function(req, res) {
    // status 200 OK
    db.Todo.find()
        .then(function(todos) {
            res.json(todos);
        })
        .catch(function(err) {
        res.send(err);
        });
});

router.post('/', function(req, res) {
    // req.body := { name: todo name }
    // status 201 created.
    db.Todo.create(req.body)
        .then(function(newTodo) {
           res.status(201).json(newTodo);
        })
        .catch(function(err) {
            res.send(err);
        });
});

module.exports = router;