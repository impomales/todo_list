/* global $ */
$(document).ready(function() {
    getTodos();
        
    // 13 is symbol for 'enter' key.
    // createTodo function is called when enter key is pressed.
    $('#todoInput').keypress(function(event) {
       if (event.which == 13) {
           createTodo();
       } 
    });
    
    $('.list').on('click', 'li', function() {
         updateTodo($(this));
    });
    
    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    });
});

function getTodos() {
    $.getJSON('/api/todos')
        .then(addTodos)
        .catch(function(err) {
            console.log(err);
        });
}

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>x</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) newTodo.addClass('done');
    $('.list').append(newTodo);
}

function updateTodo(todo) {
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var update = { completed: isDone };
    $.ajax({
            method: 'PUT',
            url: updateUrl, 
            data: update
        })
        .then(function(updatedTodo) {
            console.log(updatedTodo);
            todo.toggleClass('done');
            todo.data('completed', isDone);
        })
        .catch(function(err) {
            console.log(err);
        })
}

function removeTodo(todo) {
    var deleteUrl = '/api/todos/' + todo.data('id');
    $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function(message) {
            console.log(message);
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        });
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
