import React, { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({ inputValue: e.target.value });
    }
    
    handleSubmit() {
        if (!this.state.inputValue) {
            alert('Please enter a task to submit.');
            return;
        }
        this.props.addTodo(this.state.inputValue);
        this.setState({inputValue: ''});
    }
    
    render() {
        return (
            <section className="form">
                <input 
                    id="todoInput"
                    placeholder="Insert your task here..."
                    type="text" 
                    value={ this.state.inputValue }
                    onChange={ this.handleChange }
                    onKeyPress={(e) => {
                        if (e.which === 13) this.handleSubmit();
                    }}/>
            </section>
        );
    }
}

export default TodoForm;