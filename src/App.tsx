import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilteredValuesType = "all" | "active" | "completed"

function App() {


    //Bussiness logic: data + change logic
    //data
    const todolistTitle_1: string = 'What to learn'

    //ask React to save data(initial State), then use variable tasks(our data) and function for updating data (tasks)
    const [tasks, setTasks] = useState([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ]
    )

    //change logic

    //C-create
    const addTask = (title: string) => {
        //create new task
        // const newTask: TaskType =
        //     {
        //         id: v1(),
        //         title: title,
        //         isDone: false
        //     }
        //send a new data to React
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    //U-update by ID
    const changeTaskStatus = (taskID: string, newIsDoneValue:boolean) => {
        // const taskForUpdate: TaskType | undefined = tasks.find(t => t.id === taskID)
        // if (taskForUpdate) {
        //     taskForUpdate.isDone = !taskForUpdate.isDone //change for opposite
        // }
        // setTasks([...tasks])

        const nextState: Array<TaskType> = tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks(nextState)

    }


    //D-delete
    const removeTask = (taskId: string) => {
        //filter tasks
        const newTasks = tasks.filter(el => el.id !== taskId)
        //send a new data to React
        setTasks(newTasks)
    }


    //UI
    return (
        <div className="App">
            {/*const element = document.createElement("div")*/}
            {/*element.className.add("App")*/}
            {/*root.append(element)*/}
            <ToDoList
                title={todolistTitle_1}
                tasks={tasks}
                removeTask={removeTask}
                //changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
            {/*ToDoList()- launch function*/}
        </div>
    );
}

export default App;
