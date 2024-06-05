import "./style.scss";
import { Link } from "react-router-dom";

function Teaser({article = {}, order, maxCharacters = 300}) {
    
    return (
        <article className={`component-teaser`} style={{animationDelay: (order / 2) + "s"}}>
            {/* <img src={`/img/${article.imageUrl}`} className="component-teaser__image"/> */}
            <div 
                className="component-teaser__image"
                style={{backgroundImage: `url(/img/${article.imageUrl})`}}
            >
            </div>
            <div className="component-teaser__information">
                <h3 className="component-teaser__headline">{article.headline}</h3>
                <p className="component-teaser__abstract">
                    {
                        article.abstract.length > maxCharacters ?
                        (article.abstract.slice(0, maxCharacters) + "...") : 
                        article.abstract
                    }
                </p>
                <Link 
                    className="button"
                    to={`/blog/${article.slug}`}
                >
                    Tovább a cikkhez...
                </Link>
            </div>
        </article>
    )
}

export default Teaser;