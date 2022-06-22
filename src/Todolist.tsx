import React from "react";

type TodolistPropsType = {
    title1: string,
    title2?: number,
    tasks1: Array<task1PropsType>
}
type task1PropsType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title1}</h3>
            <h2>{props.title2}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks1.map(el=>{
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}