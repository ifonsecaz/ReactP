import React, { useEffect, useState } from "react";
import './style.css'

const TodoItem = (props) => {
    //localStorage.clear();
    const [taskId,setTaskId] = useState(1);

    const [items, setItem] = useState(()=>{
            const storedItems=localStorage.getItem('arrKey');
            const storedId=localStorage.getItem('lastID');
            if(storedItems&&storedId){
                const parsedData = JSON.parse(storedItems);
                
                setTaskId(Number(storedId));
                return parsedData;
            }
            else{
                return [];
            }
        }
    )


    const addItem = () => {
        const newTask={
            id:taskId,
            description:props.item,
            completed:false
        }
        setTaskId(prevCount => prevCount + 1);
        setItem(prevItems => [...prevItems, newTask]);
    };

    useEffect(() => {
        if (props.item) { 
            addItem();
        }
    }, [props.item]);

    useEffect(() => {
        localStorage.setItem('arrKey',JSON.stringify(items));
        localStorage.setItem('lastID',JSON.stringify(taskId));
    }, [items]);

    const completeTask = (id) => {
        setItem(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const editItem = (id) =>{
        setItem(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: prompt("Edit your task:", item.description) } : item
            )
        );
    }

    const deleteItem = (id) =>{
        setItem(prevItems => prevItems.filter(item => item.id !== id));
    }
    

    return(
    <>
    <ul className="todo-list" id="todoList">
    <li><table className="tasktable">
        <thead>
        <tr>
            <th className="tasktableid col-id">
                Task ID
            </th>
            <th className="col-desc">
                Description
            </th>
            <th className="taskCompleted col-status">
                Completed
            </th>
            <th className="col-action"></th>
            <th className="col-action"></th>
        </tr>
        </thead>
    </table></li>
     {items.map(item => (
        <li key={item.id}>
             <table className="tasktable">
                <tbody>
                <tr>
                    <td className="col-id">{item.id}</td>
                    <td className={item.completed?"col-dec":"col-desc"}>{item.description}</td>
                    <td className="taskCompleted col-status" name="completed" value=""><input type="checkbox" onChange={() => completeTask(item.id)}></input></td>
                    <td className="col-action"> <button onClick={() => editItem(item.id)}>Edit</button></td>
                    <td className="col-action"> <button onClick={() => deleteItem(item.id)}>Delete</button></td>
                </tr>
                </tbody>
             </table>
        </li>
    ))} 
    </ul>
    </>);
};

export default TodoItem;