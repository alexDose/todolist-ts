import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    removeTask: (id: number) => void
    tasks: Array<TaskType>
}



export const Todolist = (props: PropsType) => {

    let filteredTasks = props.tasks
    let [filterValue, setFilterValue] = useState("All")

    if (filterValue === "Active") {
        filteredTasks = props.tasks.filter(el => !el.isDone)
    }

    if (filterValue === "Completed") {
        filteredTasks = props.tasks.filter(el => el.isDone)
    }
    let changeTasksFilter = (name: "All" | "Active" | "Completed") => {
        setFilterValue(name)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredTasks.map(el => {
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
                    changeTasksFilter("All")
                }}>All
                </button>
                <button onClick={() => {
                    changeTasksFilter("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    changeTasksFilter("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}
