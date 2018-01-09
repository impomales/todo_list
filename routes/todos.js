 var express = require('express'),
     router = express.Router(), 
     helpers = require('../helper_functions/todos.js');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodos);
    
router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);
    
module.exports = router;