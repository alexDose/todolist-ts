import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TodolistsType} from './App';
import {Tasks} from "./Tasks";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolists: Array<TodolistsType>
    tasks: { [key: string]: Array<TaskType> }
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        <>
            {props.todolists.map(el => {
                const addTask = () => {
                    if (title.trim() !== "") {
                        props.addTask(title.trim(), el.id);
                        setTitle("");
                    } else {
                        setError("Title is required");
                    }
                }
                const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                    setError(null);
                    if (e.charCode === 13) {
                        addTask();
                    }
                }
                const removeTodolistHandler = () => {
                    props.removeTodolist(el.id)
                }

                const onAllClickHandler = () => props.changeFilter("all", el.id);
                const onActiveClickHandler = () => props.changeFilter("active", el.id);
                const onCompletedClickHandler = () => props.changeFilter("completed", el.id);


                let tasksForTodolist = props.tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = props.tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = props.tasks[el.id].filter(t => t.isDone);
                }

                return <div>
                    <h3>
                        {el.title}
                        <button onClick={removeTodolistHandler}>X</button>
                    </h3>
                    <div>
                        <input value={title}
                               onChange={onChangeHandler}
                               onKeyPress={onKeyPressHandler}
                               className={error ? "error" : ""}
                        />
                        <button onClick={addTask}>+</button>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    <ul>

                        <Tasks removeTask={props.removeTask} todolistID={el.id} tasks={props.tasks[el.id]}
                               changeTaskStatus={props.changeTaskStatus}/>

                    </ul>
                    <div>
                        <button className={el.filter === 'all' ? "active-filter" : ""}
                                onClick={onAllClickHandler}>All
                        </button>
                        <button className={el.filter === 'active' ? "active-filter" : ""}
                                onClick={onActiveClickHandler}>Active
                        </button>
                        <button className={el.filter === 'completed' ? "active-filter" : ""}
                                onClick={onCompletedClickHandler}>Completed
                        </button>
                    </div>
                </div>
            })}

        </>
    )
}
