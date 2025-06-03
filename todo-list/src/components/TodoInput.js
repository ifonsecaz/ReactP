import React, { useState } from "react";
import TodoItem from "./TodoItem.js";
import './style.css'

const TodoInput = (props) => {
    const [item, setItem] = useState(""
    )

    const [formData, setFormData] = useState("");

    const [error, setError] = useState(null);

    const handleChange = (e) =>{
        setFormData(e.target.value);
        setError(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        if(formData!==""){
            setItem(formData);
            setFormData(""); 
            setError(null);
        }
        else{
            setError("Please enter a valid task");
            setTimeout(() => setError(null), 3000);  
        }
    };

    return(
    <>
        <div className="todo-container" id="list">
        <h1>To-Do List</h1>

        <input type="text" id="taskInput" placeholder="Add a new task" name="description" value={formData} onChange={handleChange}></input>

        <button className="button" id="addTaskButton" onClick={handleSubmit}>Add Task</button>

        <br></br>
        {error && (<div className="error-message">{error}</div>)}
        </div>
        <TodoItem 
            item={item}
        />
    </>);
};

export default TodoInput;