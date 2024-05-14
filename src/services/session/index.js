export const getSessionProducts = () => {
    return JSON.parse(window.sessionStorage.getItem("products")) || [];
};

export const setSessionProducts = products => {
    window.sessionStorage.setItem("products", JSON.stringify(products));
};

export const getSessionCart = () => {
    return JSON.parse(window.sessionStorage.getItem("cart")) || [];
};

export const setSessionCart = cart => {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
};