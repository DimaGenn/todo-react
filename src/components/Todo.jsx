import { useState, useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo = () => {
    // const [tasks, setTasks] = useState(
    //     [
    //         { id: 'task-1', title: 'Купить молоко', isDone: false },
    //         { id: 'task-2', title: 'Погладить кота', isDone: true },
    //         { id: 'task-3', title: 'Посмотреть обучалку по JS', isDone: false },
    //     ])

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            return JSON.parse(savedTasks)
        }
        return [
            { id: 'task-1', title: 'Купить молоко', isDone: false },
            { id: 'task-2', title: 'Погладить кота', isDone: true },
            { id: 'task-3', title: 'Посмотреть обучалку по JS', isDone: false },
        ]
    })


    const [newTaskTitle, setNewTaskTitle] = useState('')


    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure you want delete all?')
        if (isConfirmed) {
            setTasks([])
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id != taskId))
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isDone }
            }
            return task
        }))
    }

    const filterTask = (query) => {
        console.log(`Поиск: ${query}`)
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            }

            setTasks([...tasks, newTask])
            setNewTaskTitle('')
        }
    }

    // useEffect(() => {
    //     console.log(`Компонент смонтирован, загружаем из хранилища`)
    //     const savedTasks = localStorage.getItem('tasks')
    //     if (savedTasks) {
    //         setTasks(JSON.parse(savedTasks))
    //     }
    // }, [])

    useEffect(() => {
        // console.log(`Сохраняем данные в хранилище, т к изменился tasks: ${tasks}`)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                onSearchInput={filterTask}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter((task) => task.isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                onTaskCompliteChange={toggleTaskComplete}
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask} />
        </div>
    )
}

export default Todo