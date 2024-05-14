import "./style.css";

function Navigation() {
    const navigationItems = [
        {id: "home",        label: "Kezdőlap",  path: "#"},
        {id: "products",    label: "Termékek",  path: "#"},
        {id: "blog",        label: "Blog",      path: "#"},
        {id: "contact",     label: "Kapcsolat", path: "#"},
        {id: "terms",       label: "Ászf",      path: "#"},
        {id: "cart",        label: "Kosár",     path: "#"}
    ];

    return (
        <nav className="component-navigation">
            <ul className="component-navigation-menu">
                {
                    navigationItems.map(navigationItem => {
                        const isActiveClass = navigationItem.id === "home" ? "active" : "";
                        const isCartClass = navigationItem.id === "cart" ? "cart" : "";
                        const isNormal = isActiveClass + isCartClass === "" ? "normal" : "";
                        const liClassName = `${isActiveClass} ${isCartClass}`;
                        return (
                            <li key={navigationItem.id} className={ liClassName }>
                                <a href={navigationItem.path}>
                                    {navigationItem.label}
                                    {navigationItem.id === "cart" && <img src="./img/cart.png" />}
                                </a>

                                {
                                navigationItem.id === "cart" && 
                                <div className="dropdown">
                                    <ul className="dropdown-cart-items">
                                        <li>
                                            <span className="cart-item-media">
                                                <img src="img/cart.png" />
                                            </span>
                                            <span className="cart-item-name">
                                                Kékfényszűrős olvasószemüveg
                                            </span>
                                            <span className="cart-item-quantity">
                                                1 x
                                            </span>
                                            <span className="cart-item-cost">
                                                1 200 EUR
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cart-item-media">
                                                <img src="img/cart.png" />
                                            </span>
                                            <span className="cart-item-name">
                                                Rayban napszemüveg
                                            </span>
                                            <span className="cart-item-quantity">
                                                10 x
                                            </span>
                                            <span className="cart-item-cost">
                                                400 EUR
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                }
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default Navigation;