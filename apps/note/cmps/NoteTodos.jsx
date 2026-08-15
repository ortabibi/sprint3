export function NoteTodos({ info, onUpdateNote }) {
    let { todos } = info
    if (typeof todos === 'string') {
    todos = todos.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }))
}
if (!Array.isArray(todos)) todos = []
    function toggleTodo(todoToToggle) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoToToggle.id) {
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
                        onClick={() => toggleTodo(todo)}
                    >
                        <span>{todo.txt}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}