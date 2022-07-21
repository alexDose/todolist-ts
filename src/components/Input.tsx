import React, {ChangeEvent, KeyboardEvent} from "react";

type InputType = {
    newTitle: string
    setNewTitle: (newTitle: string) => void
    callBack: () => void
}

export const Input = (props: InputType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.callBack()
        }
    }

    return (
        <input onKeyDown={onKeyPressHandler} onChange={onChangeHandler} value={props.newTitle}/>
    )
}