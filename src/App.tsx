import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const addTask = (newTitle: string, todoId: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        tasks[todoId] = [newTask, ...tasks[todoId]]
        setTasks({...tasks})
    }

    function removeTask(id: string, todoId: string) {
        let filteredTasks = tasks[todoId].filter(t => t.id != id);
        tasks[todoId] = filteredTasks
        setTasks({...tasks});
    }

    const onChangeIsDone = (id: string, isDone: boolean, todoId: string) => {
        let task = tasks[todoId].find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValuesType, id: string) => {
        const todolist = todolists.find(el => el.id == id)
        if (todolist) {
            todolist.filter =value
            setTodolists([...todolists])
        }
    }

    const todolist1 = v1()
    const todolist2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState({
        [todolist1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });

    return (

        <div className="App">

            {todolists.map((tl) => {

                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }

                return <Todolist id={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 changeFilter={changeFilter}
                                 onChangeIsDone={onChangeIsDone}
                                 filter={tl.filter}/>
            })}
        </div>
    );
}

export default App;
