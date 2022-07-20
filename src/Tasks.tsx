import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";

type MapType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    todolistID: string
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
}

export const Tasks = (props: MapType) => {
    return <>{
        props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.todolistID)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
            }

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        })
    }</>
}