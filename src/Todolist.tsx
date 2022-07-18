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
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoId: string) => void
    addTask: (newTitle: string, todoId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    onChangeIsDone: (id: string, isDone: boolean, todoId: string) => void
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
            props.addTask(newTitle.trim(), props.id)
            setNewTitle("")
        }
    }

    const changeFilter = (value: FilterValuesType, id: string) => {
        props.changeFilter(value, id)
    }

    const onClickHandler = (id: string, todoId: string) => {
        props.removeTask(id, todoId)
    }

    const onChangeIsDone = (id: string, isDone: boolean) => {
        props.onChangeIsDone(id, isDone, props.id)
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
                    <Button style={t.isDone ? "isDone" : ""} name={"X"} callBack={() => onClickHandler(t.id, props.id)}/>
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
                changeFilter("all", props.id)
            }}/>
            <Button style={props.filter === "active" ? "activeFilter" : ""} name={"Active"} callBack={() => {
                changeFilter("active", props.id)
            }}/>
            <Button style={props.filter === "completed" ? "activeFilter" : ""} name={"Completed"} callBack={() => {
                changeFilter("completed", props.id)
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
