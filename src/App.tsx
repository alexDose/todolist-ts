import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let [tasks, setTasks] = useState([{id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "Redux", isDone: false}
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    return (
        <>
            <div>
                <Todolist title={"What to learn?"} removeTask={removeTask} tasks={tasks}/>
            </div>
        </>
    )
}

export default App;
