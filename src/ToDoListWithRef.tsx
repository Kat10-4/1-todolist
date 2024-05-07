import React, {useRef, useState} from "react";
import {FilteredValuesType, TaskType} from "./App";
import {Button} from "./Button";

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void, //void - absence of return
    //changeFilter: (filter: FilteredValuesType) => void //void - absence of return
    addTask: (title: string) => void
}

export function ToDoList(
    {
        tasks,
        title,
        removeTask,
        //changeFilter
        addTask
    }: ToDoListPropsType) {

    // const tasks = props.tasks
    // const {tasks,title} = props - destructuring, make it in initial enter

    //UI logic
    //state is one of the options "all" | "active" | "completed" defaulted is "all"
    const [filter, setFilter] = useState<FilteredValuesType>("all")

    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilteredValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(el => el.isDone === false)
            case "completed":
                return allTasks.filter(el => el.isDone === true)
            default:
                return allTasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    //
    const taskInputRef = useRef<HTMLInputElement>(null)
    const addTaskHandler = () => {
        // && - if  taskInputRef.current===true => launch addTask
        //taskInputRef.current && addTask(taskInputRef.current.value)
        if (taskInputRef.current) {
            addTask(taskInputRef.current.value)
            taskInputRef.current.value = ""
        }


    }

//
    const taskslist: JSX.Element = filteredTasks.length > 0 ? <ul>{
            filteredTasks.map((task) => {
                return (
                    <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={"x"} onClickHandler={() => removeTask(task.id)}/>
                    </li>)
            })}</ul>
        : <span>Your task list is empty</span>


    return (
        <div className={"todolist"}>
            <h3>{title}</h3>
            <div>
                <input ref={taskInputRef}/>
                <Button title={'+'} onClickHandler={addTaskHandler}/>
            </div>
            {taskslist}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter("all")}/>
                <Button title={'Active'} onClickHandler={() => changeFilter("active")}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter("completed")}/>
            </div>
        </div>
    );
}
