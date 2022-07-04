import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    removeTask: (id: number) => void
    tasks: Array<TaskType>
    changeTasksFilter: (name: "All" | "Active" | "Completed") => void
}

export const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>

                            <button onClick={() => props.removeTask(el.id)}>X</button>

                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTasksFilter("All")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTasksFilter("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTasksFilter("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}
