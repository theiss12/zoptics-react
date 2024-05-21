import "./style.scss";

function ProductInfo() {
    return (
        <section className="component-product-info">
            <div className="warrant">
                <h2 className="warrant__headline">
                    Információk:
                </h2>
                <ul className="warrant__information">
                    <li>14 napos ingyenes termék-visszaküldés garancia</li>
                    <li>20 év garancia minden termékre</li>
                </ul>
            </div>
            <div className="description">
                <h2 className="description__headline">Leírás</h2>
                <p className="description__details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                    anim id est laborum
                </p>
            </div>
        </section>
    );
}

export default ProductInfo;