import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Suggestions from "../../components/Suggestions";

function Article({ articles }) {
    const [articleData, setArticleData] = useState({});
    const [fetchError, setFetchError] = useState(false);
    const { slug } = useParams();
    const contentRef = useRef(null);
    useEffect(() => {
        window.scroll(0, 0);
    fetch(`http://192.168.0.59:3200/articles/${slug}`/*`/api/articles/${slug}.json`*/)
            .then(response => response.json())
            .then(json => {
                setArticleData(json.data);
                contentRef.current.innerHTML = json.data.content;
            })
            .catch(error => setFetchError(true));
    }, [slug]);

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
                            ref={contentRef}
                        >
                        </div>
                    </div>
                </article>
                <div className="container">
                    <Suggestions 
                        items={
                            articles.map(article => {return{
                                id: article.id,
                                endpoint: `/blog/${article.slug}`,
                                imageUrl: `/img/${article.imageUrl}`,
                                headline: article.headline
                            }})
                        } 
                        currentId={articleData.id}
                        headline={"Hasonló cikkek"}
                    />
                </div>
            </div>
    )
}

export default Article;