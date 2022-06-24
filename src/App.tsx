import React, {useState} from 'react';
import './App.css';
import {Todo} from "./Todo";

export type ChangeFilterType = "all" | "active" | "complited"

type  TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const [tasks, setTask] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Next", isDone: false}
    ])
    let [filter, setFilter] = useState<ChangeFilterType>("all")
    let newTasks = tasks
    if (filter === "active") {
        newTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "complited") {
        newTasks = tasks.filter(t => t.isDone)
    }

    function removeTask(id: number) {
        let resultTasks = tasks.filter(t => t.id !== id)
        setTask(resultTasks)
    }

    function changeFilter(value: ChangeFilterType) {
        setFilter(value)
    }

    /*
            const tasks2 = [
                {id: 1, title: "Hello world", isDone: false},
                {id: 2, title: "I am happy", isDone: true},
                {id: 3, title: "Yo", isDone: false}
            ]

    */
    return (
        <div className={"App"}>
            <Todo name={"Welcome"} tasks={newTasks} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
        /*
                <div className="App">
                    <Todolist title1={"What to learn"} tasks1={tasks1}/>
                    <Todolist title1={"What to buy"} title2={1241512} tasks1={tasks2}/>
                </div>
        */
    );
}

export default App;
