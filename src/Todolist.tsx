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
    tasks: Array<TaskType>
    removeTask: (idT: string, id: string) => void
    addTask: (idT: string, newTitle: string) => void
    onChangeIsDone: (idT: string, id: string, isDone: boolean) => void
    changeFilter: (idT: string, filter: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState("")

    const addNewTaskHandler = () => {
        props.addTask(props.idT, newTitle)
        setNewTitle("")
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
            <Input newTitle={newTitle} setNewTitle={setNewTitle} callBack={addNewTaskHandler}/>
            <Button name={"+"} callBack={addNewTaskHandler}/>

            {/*
            <button onClick={addNewTaskHandler}>+</button>
*/}
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <Button name={"X"} callBack={() => onClickHandler(t.id)}/>
                    {/*
                    <button onClick={() => onClickHandler(t.id)
                    }>x
                    </button>
*/}
                    <input type="checkbox"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDone(t.id, e.currentTarget.checked)}
                           checked={t.isDone}/>
                    <span>{t.title}</span>
                </li>)
            }
        </ul>
        <div>
            <Button name={"All"} callBack={() => {
                changeFilter("all")
            }}/>
            <Button name={"Active"} callBack={() => {
                changeFilter("active")
            }}/>
            <Button name={"Completed"} callBack={() => {
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
