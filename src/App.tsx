import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(id: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    function addTask(title: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el));
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            <Todolist todolists={todolists}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      removeTodolist={removeTodolist}
                      tasks={tasks}
            />
        </div>
    );
}

export default App;
