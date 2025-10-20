import React from "react";
import "../assets/css/Accueil.css";

function Footer() {
    return (
        <footer>
           
            <section className="suggestions-section">
                <div className="suggestions-left">
                    <h2>Laissez des suggestions</h2>
                    <p>Nous avons besoin de vos avis pour nous améliorer.</p>
                </div>
                 <div className="suggestions-right">
                    <div className="comment-input-wrapper">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder="Laissez un commentaire"
                        />
                        <button className="comment-btn">Commenter</button>
                    </div>
                </div>
            </section>

         
            <div className="footer-section">
                <div className="footer-content">
                   
                    <div className="footer-newsletter">
                        <h3>Laissez votre email pour recevoir des notifications</h3>
                        <form className="email-form" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                className="email-input" 
                                placeholder="Email" 
                                required 
                            />
                            <button type="submit" className="email-submit">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M5 12h14M12 5l7 7-7 7" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        stroke="white"
                                        fill="none"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>

                 
                    <div className="footer-column">
                        <h4>A propos</h4>
                        <ul>
                            <li><a href="#">ce qu'on propose</a></li>
                            <li><a href="#">Objectifs</a></li>
                            <li><a href="#">Responsables</a></li>
                            <li><a href="#">Notre équipe</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Nos reseaux</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">WhatsApp</a></li>
                            <li><a href="#">Tiktok</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Nos magasins</h4>
                        <div className="store-map">
                            <img 
                                src="/carte.jpeg" 
                                alt="Carte des magasins" 
                            />
                        </div>
                    </div>
                </div>
                <div className="contact-section">
                    <h3>
                        Contactez nous 
                        <svg className="phone-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" 
                                fill="white"
                            />
                        </svg>
                    </h3>
                </div>
            </div>

     
        </footer>
    );
}

export default Footer;