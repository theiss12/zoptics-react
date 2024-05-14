import "./style.scss";
import { useState } from "react";

function ProductGroup({ name = "Legfrissebb" }) {
    const [collapseClass, setCollapseClass] = useState("collapsed");

    const toggleCollapse = () => {
        const newClass = collapseClass === "collapsed" ? "" : "collapsed";
        setCollapseClass(newClass);
    };
    
    return (
        <section className="component-product-group">
            <div className="container">
                <div className={`product-group-bar ${collapseClass}`}>
                    <h3 className="product-group-name">
                        {name}
                    </h3>
                    <button 
                        className="product-group-toggle-button"
                        onClick={() => {toggleCollapse()}} // throws error when not wrapped!!
                    >
                        <span className="triangle"></span>
                    </button>
                </div>
                <div className="product-group-products">
                    <article className="product-group-product">
                        <h4 className="product-name">
                            Háromszemű-veg
                        </h4>
                        <img className="product-image" src="/img/product1.jpg" />
                        <h5 className="product-price">
                            19 999 Ft
                        </h5>
                        <button className="button">
                            Kosárba rakom
                        </button>
                    </article>

                    <article className="product-group-product">
                        <h4 className="product-name">
                            Luxus Napszempa
                        </h4>
                        <img className="product-image" src="/img/product2.jpg" />
                        <h5 className="product-price">
                            99 999 Ft
                        </h5>
                        <button className="button">
                            Kosárba rakom
                        </button>
                    </article>

                    <article className="product-group-product">
                        <h4 className="product-name">
                            {"Napszemüveg (Luxus+)"}
                        </h4>
                        <img className="product-image" src="/img/product3.jpg" />
                        <h5 className="product-price">
                            999 999 Ft
                        </h5>
                        <button className="button">
                            Kosárba rakom
                        </button>
                    </article>

                    <article className="product-group-product">
                        <h4 className="product-name">
                            Alap Napszemüveg
                        </h4>
                        <img className="product-image" src="/img/product4.jpg" />
                        <h5 className="product-price">
                            9 999 Ft
                        </h5>
                        <button className="button">
                            Kosárba rakom
                        </button>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default ProductGroup;