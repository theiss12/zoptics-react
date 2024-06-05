import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Suggestions({ items = [], currentId, headline }) {

    const navigate = useNavigate();

    const [randomItems, setRandomItems] = useState([]);

    const getRandomItems = () => {
        const shuffled = items.filter(item => item.id !== currentId);
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, 3);
    }

    useEffect(() => {
        setRandomItems(getRandomItems());
    }, [items])

    return (
        <section className="component-suggestions">
            <h2 className="component-suggestions__title">
                <span className="line"></span>
                {headline}
                <span className="line"></span>
            </h2>
            <div className="suggestion-items">
                {
                    randomItems.map(item =>
                        <div
                            key={item.id}
                            className="suggestion-item"
                            onClick={() => {
                                //navigatToArticle(item.slug);
                                navigate(item.endpoint);
                                window.scroll(0, 0);
                            }}
                        >
                            <h3 className="suggestion-item__headline">
                                {item.headline}
                            </h3>
                            <img className="suggestion-item__image" src={item.imageUrl} />
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default Suggestions;