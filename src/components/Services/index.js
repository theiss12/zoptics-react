import "./style.css"

function Services({ items }) {
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

                                <button className="button">
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