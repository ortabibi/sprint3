const { useEffect } = React


export function About() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    }, [])

    return (
        <section className="about">
            <div className="animation-container">
                <video
                    src="assets/css/animation/fist-bump.mp4"
                    width="200"
                    autoPlay
                // controls
                // loop
                />
            </div>

            <div className="team-lead">
                <div className="profile-img"><img src="assets/css/img/team-gal.png.jpg" /></div>

                <ul className="contact-info">
                    <h2>Gal Wender</h2>
                    <h3>Team Lead</h3>
                    <li> <i className="fa-regular fa-envelope"></i><span>galwender.dev@gmail.com</span></li>
                </ul>
            </div>

            <article className="team-data">
                <div className="team-member">
                    <div className="team-member-description">
                        <h2>Or Tabibi</h2>
                        <h3>App Developer</h3>
                    </div>
                    <div className="profile-img"><img src="assets/css/img/team-or.png.jpeg" /></div>
                    <ul className="contact-info">
                        <hr />
                        <li> <i className="fa-solid fa-phone"></i><span>+972-54-224-8422</span></li>
                        <li> <i className="fa-regular fa-envelope"></i><span>ortabibi2002@gmail.com</span></li>
                    </ul>
                </div>

                <div className="team-member">
                    <div className="team-member-description">
                        <h2>Soli Kolet</h2>
                        <h3>App Developer</h3>
                    </div>
                    <div className="profile-img"><img src="assets/css/img/team-soli.png.jpeg" /></div>

                    <ul className="contact-info">
                        <hr />
                        <li> <i className="fa-solid fa-phone"></i><span>+972-54-611-6662</span></li>
                        <li>  <i className="fa-regular fa-envelope"></i><span>soli.kolet@gmail.com</span></li>
                    </ul>
                </div>

            </article>
        </section >
    )
}
