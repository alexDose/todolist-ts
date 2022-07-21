import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsTypes = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistsTypes>>([
        {id: todolistId1, title: "What To Learn", filter: "active"},
        {id: todolistId2, title: "what to learn", filter: "all"},
    ])
    let [tasks, setTasks] = useState({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );

    const addTask = (idT: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [idT]: [newTask, ...tasks[idT]]})
    }

    function removeTask(idT: string, id: string) {
        let filteredTasks = tasks[idT].filter(t => t.id != id);
        setTasks({...tasks, [idT]: filteredTasks});
    }

    const onChangeIsDone = (idT: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [idT]: tasks[idT].map(t => t.id === id ? {...t, isDone} : t)})
    }

    const changeFilter = (idT: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === idT ? {...tl, filter} : tl))
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return <>
                    <Todolist
                        filter={el.filter}
                        changeFilter={changeFilter}
                        key={el.id}
                        idT={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        onChangeIsDone={onChangeIsDone}/>
                </>
            })}
        </div>
    );
}

export default App;
