import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Next", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: false},
        {id: 2, title: "I am happy", isDone: true},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title1={"What to learn"} tasks1={tasks1}/>
            <Todolist title1={"What to buy"} title2={1241512} tasks1={tasks2}/>
        </div>
    );
}

export default App;
