import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { AppContext } from "../../providers/AppProvider";

function CartDropdown() {
    const { cartItems } = useContext(AppContext);
    const navigate = useNavigate();
    const navigateToProducts = () => {
        navigate("/products");
    };
    const isEmpty = cartItems.length === 0;
    const items = isEmpty ? 
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
                {
                    !isEmpty &&
                    <li>
                        <Link to={"/checkout"} className="checkout-button">Kasszához</Link>
                    </li>
                }
            </ul>
        </div>
    );
}

function Navigation({cartItems = []}) {
    const navigationItems = [
        {id: "home",            label: "Kezdőlap",      path: "/"},
        {id: "products",        label: "Termékek",      path: "/products"},
        {id: "blog",            label: "Blog",          path: "/blog"},
        {id: "contact",         label: "Kapcsolat",     path: "/contact"},
        {id: "terms",           label: "Ászf",          path: "/terms"},
        // {id: "data-protection", label: "Adatvédelem",   path: "/data-protection"},
        {id: "game",            label: "Játék",         path: "/game"},
        {id: "cart",            label: "Kosár",         path: "/cart"}
    ];

    const { pathname } = useLocation();
    useEffect(()=> {
        //console.log(pathname);
    }, [pathname]);

    const navigate = useNavigate();

    // const { searchTerm, setSearchTerm } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpened(!mobileMenuOpened);
    };

    useLayoutEffect(() => {
		const updateSize = () => {
			// console.log(window.innerWidth)
            if (window.innerWidth > 768) {
                setMobileMenuOpened(false);
            }
		};

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

    return (
        <nav className={`component-navigation ${pathname === "/game" ? "game" : ""} ${mobileMenuOpened ? "open" : ""}`}>
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
                                <Link
                                    to={navigationItem.path}
                                    onClick={() => {
                                        setMobileMenuOpened(false);
                                    }}
                                >
                                    {navigationItem.label}
                                    {navigationItem.id === "cart" && <img src="/img/cart.png" />}
                                </Link>

                                {
                                    navigationItem.id === "cart" && 
                                    <CartDropdown cartItems={cartItems}/>
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
                        setMobileMenuOpened(false);
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

            <button 
                className="mobile-toggle-button"
                onClick={toggleMobileMenu}
            >
                <div className="mobile-toggle-button__stripe"></div>
                <div className="mobile-toggle-button__stripe"></div>
                <div className="mobile-toggle-button__stripe"></div>
            </button>
        </nav>
    );
}

export default Navigation;