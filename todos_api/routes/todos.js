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

router.get('/:todoId', function(req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function(foundTodo) {
            res.json(foundTodo);
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

router.put('/:todoId', function(req, res) {
    // by default, returns old data after update,
    // { new: true } returns the updated data.
    db.Todo.findOneAndUpdate(
        { _id: req.params.todoId },
        req.body,
        { new: true })
        .then(function(updatedTodo) {
            res.json(updatedTodo);
        })
        .catch(function(err) {
            res.send(err);
        });
});

module.exports = router;