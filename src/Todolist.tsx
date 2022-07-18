import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (newTitle: string) => void
    setFilter: (value: FilterValuesType) => void
    onChangeIsDone: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addNewTaskHandler = () => {
        if (newTitle.trim() === "") {
            setError("Field is required!")
        }
        if (newTitle.trim() !== "") {
            setError("")
            props.addTask(newTitle.trim())
            setNewTitle("")
        }
    }

    const changeFilter = (value: FilterValuesType) => {
        props.setFilter(value)
    }

    const onClickHandler = (id: string) => {
        props.removeTask(id)
    }

    const onChangeIsDone = (id: string, isDone: boolean) => {
        props.onChangeIsDone(id, isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input style={error ? "message-error" : ""} newTitle={newTitle} setNewTitle={setNewTitle}
                   callBack={addNewTaskHandler} setError={setError}/>
            <Button style={""} name={"+"} callBack={addNewTaskHandler}/>
            {error && <div className={"error"}>{error}</div>}

            {/*
            <button onClick={addNewTaskHandler}>+</button>
*/}
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <Button style={t.isDone ? "isDone" : ""} name={"X"} callBack={() => onClickHandler(t.id)}/>
                    {/*
                    <button onClick={() => onClickHandler(t.id)
                    }>x
                    </button>
*/}
                    <input type="checkbox"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDone(t.id, e.currentTarget.checked)}
                           checked={t.isDone}/>
                    <span className={t.isDone ? "classGreen" : ""}>{t.title}</span>
                </li>)
            }
        </ul>
        <div>
            <Button style={props.filter === "all" ? "activeFilter" : ""} name={"All"} callBack={() => {
                changeFilter("all")
            }}/>
            <Button style={props.filter === "active" ? "activeFilter" : ""} name={"Active"} callBack={() => {
                changeFilter("active")
            }}/>
            <Button style={props.filter === "completed" ? "activeFilter" : ""} name={"Completed"} callBack={() => {
                changeFilter("completed")
            }}/>
            {/*
            <button onClick={() => {
                changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                changeFilter("completed")
            }}>
                Completed
            </button>
*/}
        </div>
    </div>
}
