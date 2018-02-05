import React from 'react';
import './TodoItem.css';

const TodoItem = ({ name, completed, onDelete, onToggle }) => (
    <li className="task">
        <span
            className={ completed ? 'taskName done' : 'taskName' }
            onClick={ onToggle }>
            { name }
        </span>
        <span className="close" onClick={ onDelete }>x</span>
    </li>
);

export default TodoItem;