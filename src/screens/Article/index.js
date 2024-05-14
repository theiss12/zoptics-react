import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Article({ articles }) {
    const [articleData, setArticleData] = useState({});
    const [fetchError, setFetchError] = useState(false);
    const { slug } = useParams();
    const contentRef = useRef(null);
    useEffect(() => {
        window.scroll(0, 0);
        fetch(`/api/articles/${slug}.json`)
            .then(response => response.json())
            .then(json => {
                setArticleData(json.data);
                contentRef.current.innerHTML = json.data.content;
            })
            .catch(error => setFetchError(true));
    }, [slug]);

    const navigate = useNavigate();
    const navigatToArticle = (slug) => {
        navigate(`/blog/${slug}`);
    };

    const suggestionStart = Math.floor((articles.length - 3) * Math.random());

    return (
        fetchError ?

            <div className="fetch-error">
                <h2 className="fetch-error__title">
                    Hiba történt...
                </h2>
                <p className="fetch-error__information">
                    A keresett oldal nem található.
                </p>
            </div> :

            <div className="screen-article">
                <article className="article">
                    <div className="article__cover" style={{ backgroundImage: `url(${articleData.imageUrl})` }}>
                        <div className="container">
                            <h2 className="article__headline">
                                {articleData.headline}
                            </h2>
                        </div>
                    </div>
                    <div className="container">
                        <p className="article__abstract">
                            {articleData.abstract}
                        </p>

                        <div
                            className="article__content"
                            //dangerouslySetInnerHTML={{ __html: articleData.content }}
                            ref={contentRef}
                        >
                        </div>
                    </div>
                </article>
                <section className="suggestions">
                    <div className="container">
                        <h2 className="suggestions__title">Hasonló cikkek:</h2>
                        <div className="suggestion-items">
                            {
                                articles.filter(article => article.id !== articleData.id).slice(suggestionStart, suggestionStart + 3).map(article =>
                                    <div
                                        key={article.id}
                                        className="suggestion-item"
                                        onClick={() => {
                                            navigatToArticle(article.slug);
                                        }}
                                    >
                                        <h3 className="suggestion-item__headline">
                                            {article.headline}
                                        </h3>
                                        <img className="suggestion-item__image" src={`/img/${article.imageUrl}`} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </div>
    )
}

export default Article;