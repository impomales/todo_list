/* global fetch */
import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const APIURL = '/api/todos';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.addTodo = this.addTodo.bind(this);
    }
    
    componentWillMount() {
        this.loadTodos();
    }
    
    loadTodos() {
        fetch(APIURL)
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errMessage: data.message };
                            throw err;
                        });
                    } else {
                        let err = { errorMessage: 'Please try again later, server is not responding.' };
                        throw err;
                    }
                }
                return resp.json();
            })
            .then(todos => this.setState({ todos }));
    }
    
    addTodo(val) {
        fetch(APIURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: val })
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errMessage: data.message };
                        throw err;
                    });
                } else {
                    let err = { errorMessage: 'Please try again later, server is not responding.' };
                    throw err;
                }
            }
            return resp.json();
        })
        .then(newTodo => {
            this.setState({ todos: [...this.state.todos, newTodo] });
        });
    }
    
    deleteTodo(id) {
        const deleteUrl = APIURL + '/' + id;
        
        fetch(deleteUrl, {
            method: 'delete'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errMessage: data.message };
                        throw err;
                    });
                } else {
                    let err = { errorMessage: 'Please try again later, server is not responding.' };
                    throw err;
                }
            }
            return resp.json();
        })
        .then(() => {
            const todos = this.state.todos.filter(todo => todo._id !== id);
            this.setState({ todos: todos });
        });
    }
    
    toggleTodo(todo) {
        const updateUrl = APIURL + '/' + todo._id;
        
        fetch(updateUrl, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed })
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errMessage: data.message };
                        throw err;
                    });
                } else {
                    let err = { errorMessage: 'Please try again later, server is not responding.' };
                    throw err;
                }
            }
            return resp.json();
        })
        .then(updatedTodo => {
            /* return toggled todo if equaled to updated todo,
                otherwise just return todo */
            const todos = this.state.todos.map(todo => 
                (todo._id === updatedTodo._id) ?
                    {...todo, completed: !todo.completed } :
                    todo
                );
            this.setState({ todos: todos });
        });
    }
    
    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem 
                key={ t._id }
                { ...t }
                /* must bind to specific todo, not todolist */
                onDelete={ this.deleteTodo.bind(this, t._id) }
                onToggle={ this.toggleTodo.bind(this, t) }/>
        ));
        return (
            <div>
                <h1>Todo List!</h1>
                <TodoForm addTodo={ this.addTodo }/>
                <ul>
                    { todos }
                </ul>
            </div>
        );
    }
}

export default TodoList;