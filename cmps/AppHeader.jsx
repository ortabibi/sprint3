const { Link, NavLink } = ReactRouterDOM
const { useRef } = React

export function AppHeader() {
    const navRef = useRef()
    const backdropRef = useRef()

    function toggleMenu() {
        navRef.current.classList.toggle('show')
        backdropRef.current.classList.toggle('hide')
    }

    function onBackdrop() {
        navRef.current.classList.remove('show')
        backdropRef.current.classList.add('hide')
    }

    return <header className="app-header">
        <Link to="/">
            <div className="logo">
                <img src="assets\css\img\Gemini_Generated_Image_zg7syyzg7syyzg7s.jpg" alt="" />
                <h2>Appsus</h2>
            </div>
        </Link>

        <div onClick={toggleMenu} className="apps-icon hide">
            <span className="material-symbols-outlined">apps</span>
        </div>

        <nav ref={navRef}>
            <NavLink to="/" onClick={onBackdrop}>
                <div className="nav-word">Home</div>
                <div className="nav-logo hide">
                    <span className="material-symbols-outlined">home</span>
                </div>
            </NavLink>
            <NavLink to="/about" onClick={onBackdrop}>
                <div className="nav-word">About</div>
                <div className="nav-logo hide">
                    <span className="material-symbols-outlined">groups</span>
                </div>
            </NavLink>
            <NavLink to="/mail" onClick={onBackdrop}>
                <div className="nav-word">Mail</div>
                <div className="nav-logo hide">
                    <span className="material-symbols-outlined">mail</span>
                </div>
            </NavLink>
            <NavLink to="/note" onClick={onBackdrop}>
                <div className="nav-word">Note</div>
                <div className="nav-logo hide">
                    <span className="material-symbols-outlined">description</span>
                </div>
            </NavLink>
        </nav>

        <div onClick={onBackdrop} ref={backdropRef} className="menu-backdrop hide"></div>
    </header>
}