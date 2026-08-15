const { useState } = React
import { NoteType } from '../cmps/NoteType.jsx'

export function NoteAdd({ onAddNote }) {
  const [newNote, setNewNote] = useState({ info: { title: "", txt: "",todos:[]},type: "NoteTxt" })
const { propName, placeholder } = getNoteType(newNote.type)
const [todoInput, setTodoInput] = useState('')

  function handleChange({ target }) {
    const { name, value } = target
    setNewNote((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [name]: value },
    }))
  }

  function onSaveNote(e) {
    e.preventDefault()
    onAddNote(newNote)
    setNewNote({ info: { title: "", txt: "",todos: [] } ,type: "NoteTxt"})
  setTodoInput('')
  }
function getNoteType(noteType) {
    switch (noteType) {
        case 'NoteTxt':
            return {
                propName: 'txt',
                placeholder: 'New text...'
            }
        case 'NoteImg':
            return {
                propName: 'url',
                placeholder: 'Enter image URL...'
            }
        case 'NoteVideo':
            return {
                propName: 'url',
                placeholder: 'Enter video URL...'
            }
        // case 'NoteTodos':
        //     return {
        //         propName: 'todos',
        //         placeholder: 'New note...'
        //     }
            case 'NoteCanvas':
            return {
                propName: 'canvas',
                placeholder: 'Drew'
            }
        default:
            return {
                propName: 'txt',
                placeholder: 'new note...'
            }
    }
}
 function onSelectNoteType(type) {
  setNewNote(prevNote => ({
    ...prevNote,
    type,
    info: {
      title: prevNote.info.title || '',
      txt: '',
      todos: []
    }
  }))
}
  function handleTodoInputChange({ target }) {
    setTodoInput(target.value)
  }
  function onAddTodoItem(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!todoInput.trim()) return

    const newTodo = {
      id: 't' + Date.now(),
      txt: todoInput.trim(),
      doneAt: null,
    }

    setNewNote((prevNote) => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        todos: [...(prevNote.info.todos || []), newTodo],
      },
    }))
    setTodoInput('')
  }
  function onRemoveTodoItem(todoId) {
  setNewNote(prevNote => ({
    ...prevNote,
    info: {
      ...prevNote.info,
      todos: prevNote.info.todos.filter(todo => todo.id !== todoId)
    }
  }))
}

  return  <section className="note-add">
    <form onSubmit={onSaveNote}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newNote.info.title || ''}
        onChange={handleChange}
      />
    
      <input
        type="text"
        name="txt"
        placeholder="New note.."
        value={newNote.info.txt || ''}
        onChange={handleChange}
      />
    {(newNote.type === 'NoteImg' ||
          newNote.type === 'NoteVideo' ||
          newNote.type === 'NoteCanvas') && (
          <input
            type="text"
            name={propName}
            placeholder={placeholder}
            value={newNote.info[propName] || ''}
            onChange={handleChange}
          />
        )}
   {newNote.type === 'NoteTodos' && (
  <div className="todos-input-container">
    <div className="todos-input-group">
      <input
        type="text"
        placeholder="Enter a task..."
        value={todoInput}
        onChange={handleTodoInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onAddTodoItem(e)
          }
        }}
      />
      <button type="button" className="add-todos-btn" onClick={onAddTodoItem}>
        +
      </button>
    </div>
  {newNote.info.todos && newNote.info.todos.length > 0 && (
      <ul className="preview-todos-list">
        {newNote.info.todos.map((todo) => (
          <li key={todo.id} className="preview-todo-item">
            <span>{todo.txt}</span>
            <button
              type="button"
              className="remove-todo-btn"
              onClick={() => onRemoveTodoItem(todo.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
)}

      <NoteType
      onSelectNoteType={onSelectNoteType}
      />
      <button type="submit">Save</button>
    </form>
  </section>
}
//{text} todo, img, canvas,video,