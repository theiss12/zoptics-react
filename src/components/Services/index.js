import "./style.css"
import { useNavigate } from "react-router-dom";

function Services({ items }) {
    const navigate = useNavigate();

    return (
        <section className="component-services">
            <div className="container">
                <div className="services">
                    {
                        items.map(item =>
                            <div key={item.id} className="service">
                                <img className="image" src={item.imageUrl} />

                                <h2 className="headline">
                                    {item.headline}
                                </h2>

                                <p className="description">
                                    {item.description}
                                </p>

                                <button 
                                    className="button"
                                    onClick={() => {navigate("/placeholder")}}
                                >
                                    Részletek
                                </button>
                            </div>
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default Services;