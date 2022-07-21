import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    idT: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (idT: string, id: string) => void
    addTask: (idT: string, newTitle: string) => void
    onChangeIsDone: (idT: string, id: string, isDone: boolean) => void
    changeFilter: (idT: string, filter: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addNewTaskHandler = () => {
        if (!newTitle.trim()) {
            setError("Field is required!")
        }
        if (newTitle.trim()) {
            setError("")
            props.addTask(props.idT, newTitle.trim())
            setNewTitle("")
        }

    }

    const changeFilter = (value: FilterValuesType) => {
        props.changeFilter(props.idT, value)
    }

    const onClickHandler = (id: string) => {
        props.removeTask(props.idT, id)
    }

    const onChangeIsDone = (id: string, isDone: boolean) => {
        props.onChangeIsDone(props.idT, id, isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input setError={setError} style={error ? "message-error" : ""} newTitle={newTitle} setNewTitle={setNewTitle} callBack={addNewTaskHandler}/>
            <Button style={""} name={"+"} callBack={addNewTaskHandler}/>
            {error && <div className={"error"}>{error}</div>}

        </div>
        <ul>
            {
                props.tasks.map(t => <li className={t.isDone ? "isDone" : ""} key={t.id}>
                    <Button style={"del"} name={"X"} callBack={() => onClickHandler(t.id)}/>
                    <input type="checkbox"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDone(t.id, e.currentTarget.checked)}
                           checked={t.isDone}/>
                    <span className={t.isDone ? "classGreen" : "classHotpink"}>{t.title}</span>
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
        </div>
    </div>
}
