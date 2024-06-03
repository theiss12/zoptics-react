import "./style.scss";
import { useParams } from "react-router-dom";
import { getSessionProducts } from "../../services/session";
import { useEffect, useState } from "react";

import Gallery from "../../components/Gallery";
import ContentSwitcher from "../../components/ContentSwitcher";
import ProductInfo from "./components/ProductInfo";
import ProductSummary from "./components/ProductSummary";
import Suggestions from "../../components/Suggestions";

function Product() {
    const { slug } = useParams();
    const [product, setProduct] = useState({id: 1});
    const products = getSessionProducts();

    useEffect(() => {
        const newProduct = products.find(product => product.slug === slug);
        setProduct(newProduct);
    }, [slug]);

    const switcherContents = [
        {
        label: "Specifikációk",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
        label: "Allergének",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
        label: "Összetevők",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
        label: "Összetevők",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
        label: "Összetevők",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ];

    return (
        <section className="screen-product">
            <div className="container">
                <p className="screen-product__category">
                    Kategória: {product.categoryId}
                </p>
                <h2 className="screen-product__name">
                    {product.name}
                </h2>
                <div className="gallery-summary-wrapper">
                    <Gallery imageSources={[
                        product.imageUrl,
                        ...getSessionProducts().map(product => product.imageUrl)
                    ]}/>
                    <ProductSummary product={product}/>
                </div>

                <ProductInfo />
                <ContentSwitcher contents={ switcherContents }/>
                <Suggestions 
                    items={
                        products.map(product => ({
                            id: product.id,
                            endpoint: `/products/${product.slug}`,
                            imageUrl: product.imageUrl,
                            headline: product.name
                        }))
                    } 
                    currentId={product.id} 
                    headline={"Hasonló termékek"}
                />

            </div>
        </section>
    );
}

export default Product;