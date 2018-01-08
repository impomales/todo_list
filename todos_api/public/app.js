/* global $ */
$(document).ready(function() {
    $.getJSON('/api/todos')
        .then(addTodos)
        .catch(function(err) {
            console.log(err);
        });
        
    // 13 is symbol for 'enter' key.
    // createTodo function is called when enter key is pressed.
    $('#todoInput').keypress(function(event) {
       if (event.which == 13) {
           createTodo();
       } 
    });
});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '</li>');
    if (todo.completed) newTodo.addClass('done');
    $('.list').append(newTodo);
}

function createTodo() {
    var usrInput = $('#todoInput').val();
    $.post('/api/todos', { name: usrInput })
        .then(function(newTodo) {
            addTodo(newTodo);
            $('#todoInput').val('');
        })
        .catch(function(err) {
            console.log(err);
        });
}
