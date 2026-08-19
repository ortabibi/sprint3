const { useState, useEffect } = React

import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'
import { mailService } from '../services/mail.service.js'
import { ReadTabs } from '../cmps/ReadTabs.jsx'

export function MailFilter({ filterBy, onSetFilterBy, hideTabs, onToggleSideMenu }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffectUpdate(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        const { value, name } = ev.target
        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function setReadTab(isRead) {
        setFilterByToEdit(prev => ({ ...prev, isRead }))
    }

    return <section className="top-filter">
        <form className="search-bar-container" onSubmit={ev => ev.preventDefault()}>
            <div className="gmail-logo menu-gmail">
                <span className="material-symbols-outlined side-menu-btn hide" onClick={onToggleSideMenu}>menu</span>
                <img src="./assets/css/img/Gmail_logo.svg" alt="Gmail" />
            </div>
            <div className="search-bar">
                <button type="button" className="search-btn">
                    <span className="material-symbols-outlined">search</span>
                </button>
                <input
                    onChange={handleChange}
                    value={filterByToEdit.txt || ''}
                    className="text-input"
                    placeholder="Search mail"
                    type="text"
                    name="txt"
                    id="txt"
                />
                <button type="button" className="date-btn">
                    <span className="material-symbols-outlined">event</span>
                </button>
            </div>
        </form>

        <ReadTabs isRead={filterByToEdit.isRead} onSetIsRead={setReadTab} hideTabs={hideTabs} />
    </section>
}