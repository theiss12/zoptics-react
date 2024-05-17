import "./style.scss";
import { useParams } from "react-router-dom";
import { getSessionProducts } from "../../services/session";
import { useEffect, useState } from "react";

import Gallery from "../../components/Gallery";
import ContentSwitcher from "../../components/ContentSwitcher";
import ProductInfo from "./components/ProductInfo";
import ProductSummary from "./components/ProductSummary";
import SimilarProducts from "./components/SimilarProducts";

function Product() {
    const { slug } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const products = getSessionProducts();
        const newProduct = products.find(product => product.slug === slug);
        setProduct(newProduct);
    }, []);

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
                    <Gallery product={product}/>
                    <ProductSummary product={product}/>
                </div>

                <ProductInfo />
                <ContentSwitcher />
                <SimilarProducts />

            </div>
        </section>
    );
}

export default Product;