import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    setFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState("")

    const addNewTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle("")
    }

    const changeFilter = (value: FilterValuesType) => {
        props.setFilter(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addNewTaskHandler()
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyDown={onKeyPressHandler} onChange={onChangeHandler} value={newTitle}/>
            <button onClick={addNewTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                </li>)
            }
        </ul>
        <div>
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
        </div>
    </div>
}
