const { useState } = React
import { NoteType } from './NoteType.jsx'
import { NoteColor } from './NoteColor.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'

export function NoteAdd({ onAddNote }) {
  const [newNote, setNewNote] = useState({
    info: { title: '', txt: '', todos: [] },
    type: 'NoteTxt',
    style: { backgroundColor: '#ffffff' }
  })
  const [todoInput, setTodoInput] = useState('')
  const [isExpand, setIsExpand] = useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const { propName, placeholder } = getNoteType(newNote.type)

  function handleChange({ target }) {
    const { name, value } = target
    setNewNote((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [name]: value },
    }))
  }

  function handleStyleChange(backgroundColor) {
    setNewNote((prevNote) => ({
      ...prevNote,
      style: { ...prevNote.style, backgroundColor },
    }))
  }

  function onSaveNote(e) {
    e.preventDefault()
    onAddNote(newNote)
    setNewNote({
      info: { title: '', txt: '', todos: [] },
      type: 'NoteTxt',
      style: { backgroundColor: '#ffffff' }
    })
    setTodoInput('')
    setIsExpand(false)
    setIsColorPickerOpen(false)
  }

  function getNoteType(noteType) {
    switch (noteType) {
      case 'NoteTxt':
        return { propName: 'txt', placeholder: 'New text...' }
      case 'NoteImg':
        return { propName: 'url', placeholder: 'Enter image URL...' }
      case 'NoteVideo':
        return { propName: 'url', placeholder: 'Enter video URL...' }
      case 'NoteCanvas':
        return { propName: 'canvas', placeholder: 'Drew' }
      default:
        return { propName: 'txt', placeholder: 'new note...' }
    }
  }

  function onSelectNoteType(type) {
    setIsExpand(true)
    setNewNote((prevNote) => ({
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
    setNewNote((prevNote) => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        todos: prevNote.info.todos.filter((todo) => todo.id !== todoId),
      },
    }))
  }

  function onSaveCanvasDrawing(dataUrl) {
    setNewNote((prevNote) => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        url: dataUrl,
      },
    }))
  }

  return (
    <section className="note-add">
      <form
        onSubmit={onSaveNote}
        className="note-card"
        style={{ backgroundColor: (newNote.style && newNote.style.backgroundColor) || '#ffffff' }}
      >
        <div className="note-inputs-box">
          {isExpand && (
            <div className="title-row">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newNote.info.title || ''}
                onChange={handleChange}
              />
            </div>
          )}

          <input
            type="text"
            name="txt"
            placeholder="New note.."
            value={newNote.info.txt || ''}
            onChange={handleChange}
            onClick={() => setIsExpand(true)}
          />

          {isExpand && (
            <React.Fragment>
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
                    <button
                      type="button"
                      className="add-todos-btn"
                      onClick={onAddTodoItem}
                    >
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

              {newNote.type === 'NoteCanvas' && (
                <NoteCanvas onSaveCanvas={onSaveCanvasDrawing} />
              )}
            </React.Fragment>
          )}
        </div>

        <div className="note-card-actions">
          <div className="tools-left">
            <NoteType
              onSelectNoteType={onSelectNoteType}
              selectedType={newNote.type}
            />

            {isExpand && (
              <button
                type="button"
                className="tool-btn"
                onClick={() => setIsColorPickerOpen((prev) => !prev)}
                title="Change Color"
              >
                <i className="fa-solid fa-palette"></i>
              </button>
            )}
          </div>

          {isExpand && (
            <button type="submit" className="save-btn">
              Save
            </button>
          )}
        </div>

        {isExpand && isColorPickerOpen && (
          <div className="color-picker-wrapper">
            <NoteColor
              onSetNoteStyle={handleStyleChange}
              bgColor={(newNote.style && newNote.style.backgroundColor) || '#ffffff'}
            />
          </div>
        )}
      </form>
    </section>
  )
}