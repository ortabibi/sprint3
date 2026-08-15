export function NoteTodos({ info, onUpdateNote }) {
    let { todos } = info
if (!Array.isArray(todos)) todos = []

   function toggleTodo(targetIdx) {
        const updatedTodos = todos.map((todo, idx) => {
            if (idx === targetIdx) {
                return {
                    ...todo,
                    doneAt: todo.doneAt ? null : Date.now()
                }
            }
            return todo
        })

        if (onUpdateNote) {
            onUpdateNote({
                ...info,
                todos: updatedTodos
            })
        }
    }
    return (
        <div className="note-todos-container">
            <ul className="todo-list">
                {todos && todos.map((todo,idx) => (
                    <li 
                        key={todo.id || idx} 
                        className={`todo-item ${todo.doneAt ? 'done' : ''}`}
                        onClick={() => toggleTodo(idx)}
                    >
                        <span>{todo.txt}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
