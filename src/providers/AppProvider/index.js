import { createContext, useState } from "react";
import { setSessionCart, getSessionCart } from "../../services/session";
import { getNewCart } from "../../services/cart";

export const AppContext = createContext();

const AppProvider = (props) => {
    const [cartItems, setCartItems] = useState(getSessionCart());
    const [searchTerm, setSearchTerm] = useState("");

    const updateCart = (product, quantity) => {
        const newCart = getNewCart(product, quantity);
        setCartItems(newCart);
        setSessionCart(newCart);
    };

    return (
        <AppContext.Provider value={{updateCart, cartItems, searchTerm, setSearchTerm}}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppProvider;