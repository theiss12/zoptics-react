import "./style.scss";
import { Link } from "react-router-dom";

function Footer() {
    const logos = [
        "/img/logos/github-logo.png",
        "/img/logos/linkedin-logo.png",
        "/img/logos/youtube-logo.png",
        "/img/logos/facebook-logo.png",
        "/img/logos/instagram-logo.png",
        "/img/logos/tiktok-logo.png",
        "/img/logos/twitter-logo.png",
    ];
    
    const links = [
        {label: "email: tamas.zeiss@gemail.com", endpoint: "mailto:tamas.zeiss@gmail.com", internal: false},
        {label: "Tel.: +36 01 234 5678", endpoint: "tel:+36012345678", internal: false},
        {label: "Adatvédelmi nyilatkozat", endpoint: "/data-protection", internal: true},
        {label: "ÁSZF", endpoint: "/terms", internal: true},
        {label: "Nyereményjáték", endpoint: "/game", internal: true}
    ];

    return (
        <footer className="component-footer">
            <div className="component-footer__logos">
                <span className="margin-line"></span>
                {
                    logos.map((logo, logoIndex) => 
                        <a href="#" key={logoIndex}>
                            <img src={logo} className="component-footer__logo"/>
                        </a>
                    )
                }
                <span className="margin-line"></span>
            </div>
            <img src="/img/logos/company-logo.png" className="component-footer__company-logo"/>
            <p className="component-footer__copyright">
                Floppyright © {new Date().getFullYear()}
            </p>
            <ul className="component-footer__links">
                {
                    links.map((link, linkIndex) =>
                        <li className="component-footer__link" key={linkIndex}>
                            {
                                link.internal ? 
                                <Link to={link.endpoint}>{link.label}</Link> :
                                <a href={link.endpoint}>{link.label}</a>
                            }
                        </li>
                    )
                }
            </ul>

        </footer>
    );
}

export default Footer;