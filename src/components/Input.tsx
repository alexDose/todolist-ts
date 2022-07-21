import React, {ChangeEvent, KeyboardEvent} from "react";

type InputType = {
    newTitle: string
    setNewTitle: (newTitle: string) => void
    callBack: () => void
    style: string | undefined
    setError: (error: string) => void
}

export const Input = (props: InputType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError("")
        if (e.key === "Enter") {
            props.callBack()
        }
    }

    return (
        <input className={props.style} onKeyDown={onKeyPressHandler} onChange={onChangeHandler} value={props.newTitle}/>
    )
}