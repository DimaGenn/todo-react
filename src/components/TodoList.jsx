import TodoItem from "./TodoItem"

const TodoList = (props) => {
    const {
tasks = [],
onDeleteTaskButtonClick,
onTaskCompliteChange, 
filteredTasks
    } = props

    const hasTasks = tasks.length > 0
    const isEmptyFilterredTasks = filteredTasks?.length === 0 //оператор опциональной последовательности

    if (!hasTasks) {
        return <div className="todo__empty-message">Пока что задач нет!</div>
        
    }
    if (hasTasks && isEmptyFilterredTasks) {
        return <div className="todo__empty-message">Искомые задачи не найдены!</div>
    }
    
        return (
            <ul className="todo__list">
                {(filteredTasks ?? tasks ).map(({id, title, isDone}) => ( //деструктурируем из task для быстрой записи, а можно еще в аргументы записать task  и внутри функции {...task}
                    <TodoItem
                    className="todo__item"
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompliteChange={onTaskCompliteChange}
                    key={id}
                    id={id}
                    title={title}
                    isDone={isDone}

                    />
                ))}
                {/* <TodoItem
                    className="todo__item"
                    id="task-1"
                    title="Купить молоко"
                    isDone={false}
                />
                <TodoItem
                    className="todo__item"
                    id="task-2"
                    title="Погладить кота"
                    isDone
                /> */}
            </ul>
        )
    


}

export default TodoList