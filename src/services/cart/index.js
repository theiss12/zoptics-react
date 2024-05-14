import { getSessionCart } from "../session";

export const getNewCart = (/*currentCart, */product, quantity) => {
    let cart = getSessionCart();//[...currentCart];
    const productInCart = cart.find(cartItem => cartItem.id === product.id);
    if (productInCart) {
        productInCart.quantity += quantity;
    }
    else {
        cart = [...cart, {...product, quantity}];
    }
    cart = cart.filter(cartItem => cartItem.quantity > -1)
    return cart;
}