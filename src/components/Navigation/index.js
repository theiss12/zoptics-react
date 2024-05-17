import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../providers/AppProvider";

// function formatNumberToCost(n) {
//     const number = n.toString();
//     const parts = number.split(".");
//     const isInt = parts.length === 1;
//     const int = isInt ? number : parts[0];
//     var output = "";
//     for (var d = int.length - 1; d >= 0; d--) {
//         const iteration = int.length - 1 - d;
//         const digit =  int.charAt(d) + (iteration % 3 === 0 && iteration !== 0 ? " ": "");
//         output = digit + output;
//     }
//     if (!isInt) output += "," + parts[1];
//     return output;
// }

function Cart() {
    const { cartItems } = useContext(AppContext);
    const navigate = useNavigate();
    const navigateToProducts = () => {
        navigate("/products");
    };
    const items = cartItems.length === 0 ? 
    <li className="empty-cart-message">
        <button 
            className="button"
            onClick={navigateToProducts}
        >
            <p className="empty-cart-message__information">A kosár üres 🙁<br/>Termékekhez</p>
        </button>
    </li>
    :
    cartItems.map(cartItem => 
        <li key={ cartItem.id }>
            <span className="cart-item-media">
                <img src="/img/cart.png" />
            </span>
            <span className="cart-item-name">
                { cartItem.name }
            </span>
            <span className="cart-item-quantity">
                { cartItem.quantity } x
            </span>
            <span className="cart-item-cost">
                { `${Math.round(cartItem.price * (1 - cartItem.discount))} ${cartItem.currency}`}
            </span>
        </li>
    );
    return (
        <div className="dropdown">
            <ul className="dropdown-cart-items">
                { items }
            </ul>
        </div>
    );
}

function Navigation({cartItems = []}) {
    const navigationItems = [
        {id: "home",        label: "Kezdőlap",  path: "/"},
        {id: "products",    label: "Termékek",  path: "/products"},
        {id: "blog",        label: "Blog",      path: "/blog"},
        {id: "contact",     label: "Kapcsolat", path: "/contact"},
        {id: "terms",       label: "Ászf",      path: "/terms"},
        {id: "game",        label: "Játék",     path: "/game"},
        {id: "cart",        label: "Kosár",     path: "/cart"}
    ];

    const { pathname } = useLocation();
    useEffect(()=> {
        //console.log(pathname);
    }, [pathname]);

    const navigate = useNavigate();

    // const { searchTerm, setSearchTerm } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <nav className={`component-navigation ${pathname === "/game" ? "game" : ""}`}>
            <ul className="component-navigation-menu">
                {
                    navigationItems.map(navigationItem => {
                        
                        const isCartClass = navigationItem.id === "cart" ? "cart" : "";
                        const isActiveClass = navigationItem.path === pathname ? "active" : "";
                        return (
                            <li 
                                key={navigationItem.id} 
                                className={ `${isCartClass} ${isActiveClass}` }
                            >
                                <Link to={navigationItem.path}>
                                    {navigationItem.label}
                                    {navigationItem.id === "cart" && <img src="/img/cart.png" />}
                                </Link>

                                {
                                    navigationItem.id === "cart" && 
                                    <Cart cartItems={cartItems}/>
                                }
                            </li>
                        );
                    })
                }
            </ul>
            <form 
                className="component-navigation__search"
                onSubmit={
                    (submitEvent) => {
                        submitEvent.preventDefault();
                        navigate(`/search?searchTerm=${searchTerm}`, {state: searchTerm});
                        window.document.activeElement.value = "";
                        window.document.activeElement.blur();
                    }
                }
            >
                <input 
                    placeholder="🔎 Keresés az oldalon..."
                    type="text" 
                    className="component-navigation__search-input"
                    onChange={ changeEvent => setSearchTerm(changeEvent.target.value) }
                />
            </form>
        </nav>
    );
}

export default Navigation;