import { useState, useEffect, useRef, useCallback, useMemo} from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"

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
    const [searchQuery, setSearchQuery] = useState('')


    const newTaskInputRef = useRef(null)
    const firstIncompleteTaskRef = useRef(null)
    const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure you want delete all?')
        if (isConfirmed) {
            setTasks([])
        }
    }, []) //если бы функция зависила от каких-то данных, то мы бы добавили их сюда

    const deleteTask = useCallback((taskId) => {
        setTasks(tasks.filter((task) => task.id != taskId))
    }, [tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isDone }
            }
            return task
        }))
    }, [tasks])

    // const filterTask = (query) => {
    //     console.log(`Поиск: ${query}`)
    // }

    const addTask = useCallback(() => {
        () => {
        //const newTaskTitle = newTaskInputRef.current.value // получаем доступ к дом элементу и получаем значение свойства value

        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            }
            setTasks((prevTasks) => [...prevTasks, newTask])
            setNewTaskTitle('')
            //newTaskInputRef.current.value = ''
            setSearchQuery('') //отключит поиск при вводе новой задачи
            newTaskInputRef.current.focus()
        }
    }
    },[newTaskTitle])

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

    useEffect(() => {
        newTaskInputRef.current.focus()
    }, [])

    // const renderCount = useRef(0)

    // useEffect(()=>{
    //     renderCount.current++
    //     console.log(`Компонент todo отрендерился ${renderCount.current} раз(а)`) // без списка зависимости эффект срабатывает после каждого рендера
    // })

   
    const filteredTasks = useMemo(() => {
         const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0
        ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
        : null}, [searchQuery, tasks])

        const memoizedFn = useCallback(() => {
        }, [])

        const doneTasks = useMemo(()=> {
            tasks.filter((task) => task.isDone).length}
        , [tasks]) 

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                // onSearchInput={filterTask}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={doneTasks}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
                Show first in complit task
            </Button>
            <TodoList
                onTaskCompliteChange={toggleTaskComplete}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask} />
        </div>
    )
}

export default Todo