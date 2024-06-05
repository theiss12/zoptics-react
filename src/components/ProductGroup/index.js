import "./style.scss";
import { useState, useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
import { Link, useNavigate } from "react-router-dom";

function ProductGroup({ group, products, /*updateCart,*/ collapsedState = true}) {
    const [collapsed, setCollapse] = useState(collapsedState);
    const { updateCart } = useContext(AppContext);
    const navigate = useNavigate();

    const getCollapsedClass = () => collapsed ? "collapsed" : "";

    const getProductById = (id) => {
        return products.find(product => product.id === id);
    };

    const getProductsToRender = () => {
        const productsToRender = [];
        for (let id of group.productIds) {
            const foundProduct = getProductById(id);
            if (foundProduct) productsToRender.push(foundProduct);
        }
        return productsToRender;
    }

    const productsToRender = getProductsToRender();
    
    return (
        <section className="component-product-group">
            <div className="container">
                <div className={`product-group-bar ${getCollapsedClass()}`}>
                    <h3 className="product-group-name">
                        {
                            group ? group.name : ""
                        }
                    </h3>
                    <button 
                        className="product-group-toggle-button"
                        onClick={() => {setCollapse(!collapsed)}}
                    >
                        <span className="triangle"></span>
                    </button>
                </div>
                <div className="product-group-products">
                    {
                        productsToRender.map(
                            product =>
                            <article 
                                className="product-group-product"
                                key={product.id}
                            >
                                {
                                    product.discount > 0 &&
                                    <p className="discount-ribbon">
                                        {product.discount * 100}%
                                    </p>
                                }
                                <h4 className="product-name">
                                    <Link 
                                        to={"products/" + product.slug}
                                        onClick={() => {window.scroll(0, 0)}}
                                    >
                                        {product.name}
                                    </Link>
                                </h4>
                                <img 
                                    className="product-image" 
                                    src={product.imageUrl} 
                                    onClick={() => {
                                        navigate(`/products/${product.slug}`);
                                        window.scroll(0, 0);
                                    }}
                                />
                                <h5 className="product-cost">
                                    {Math.round(product.price * (1 - product.discount))} {product.currency + " "}
                                    {
                                        product.discount > 0 &&
                                        <span className="product-price">
                                            ({product.price} {product.currency})
                                        </span>
                                    }
                                </h5>
                                <button 
                                    className="button"
                                    onClick={() => {updateCart(product, 1)}}
                                >
                                    Kosárba rakom
                                </button>
                            </article>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default ProductGroup;