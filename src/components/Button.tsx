import React from "react";
import {FilterValuesType} from "../App";

type ButtonType = {
    name: string
    callBack: () => void
    style: string | undefined

}

export const Button = (props: ButtonType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return  (

        <button className={props.style} onClick={onClickHandler}>{props.name}</button>
    )
}