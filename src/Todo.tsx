import React from "react";
import {ChangeFilterType} from "./App";

export type TodoType = {
    name: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (value: ChangeFilterType) => void
}
type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todo = (props: TodoType) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t =>
                    <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title} </span>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>x
                        </button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("complited")}}>Complited
                </button>
            </div>
        </div>
    )
}