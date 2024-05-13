import React, {useRef, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilteredValuesType, TaskType} from "./App";
import {Button} from "./Button";

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void, //void - absence of return
    //changeFilter: (filter: FilteredValuesType) => void //void - absence of return
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

export function ToDoList(
    {
        tasks,
        title,
        removeTask,
        //changeFilter
        addTask,
        changeTaskStatus
    }: ToDoListPropsType) {

    // const tasks = props.tasks
    // const {tasks,title} = props - destructuring, make it in initial enter

    //UI logic
    //state is one of the options "all" | "active" | "completed" defaulted is "all"
    const [filter, setFilter] = useState<FilteredValuesType>("all")

    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
    }

    const [error, setError] = useState<string | null>(null)

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
    const [taskTitle, setTaskTitle] = useState("")

    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle !== "") {
            addTask(taskTitle)
            setTaskTitle('')
        } else {
            setError("Title is required")
        }
        setTaskTitle('')
    }

    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    }
//
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTaskTitle(e.currentTarget.value)
    }


    const isAddButtonDisabled = taskTitle.trim().length === 0 || taskTitle.trim().length >= 15

    const taskslist: JSX.Element = filteredTasks.length > 0 ? <ul>{
            filteredTasks.map((task) => {
                const removeTaskHandler = () => {
                    removeTask(task.id)
                }

                const changeTaskStatusHandler = ((e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked)
                })

                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={task.isDone ? "taskDone" : "task"}>{task.title}</span>
                        <Button title={"x"} onClickHandler={removeTaskHandler}/>
                    </li>)
            })}</ul>
        : <span>Your task list is empty</span>


    return (
        <div className={"todolist"}>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                       className={error ? "task-input-error" : ""}
                />
                <Button title={'+'} onClickHandler={addTaskHandler}
                        disabled={isAddButtonDisabled}/>
                {error && <div style={{color: "red"}}>{error}</div>}
                {taskTitle.trim().length > 10 && taskTitle.length < 15 &&
                    <div>Recommended task length not more than 10 symbols</div>}
                {taskTitle.trim().length >= 15 && <div style={{color: "red"}}>Title is too long</div>}
            </div>
            {taskslist}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter("all")}
                        classes={filter === "all" ? "btn-filter-active" : ""}/>
                <Button title={'Active'} onClickHandler={() => changeFilter("active")}
                        classes={filter === "active" ? "btn-filter-active" : ""}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter("completed")}
                        classes={filter === "completed" ? "btn-filter-active" : ""}/>
            </div>
        </div>
    );
}
