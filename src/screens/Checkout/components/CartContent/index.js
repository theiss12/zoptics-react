import "./style.scss";
import { AppContext } from "../../../../providers/AppProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartContent({formData, setFormData}) {

    const { cartItems, updateCart } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(
            {
                ...formData, 
                totalPrice: cartItems.reduce(
                    (total, cartItem) => total + (Math.round(cartItem.price * (1 - cartItem.discount))) * cartItem.quantity, 0
                )
            }
        );
        if (cartItems.length <= 0) {
            navigate("/");
        }
    }, [cartItems])

    return (
        <section className="component-cart-content">
            <ul className="cart-items">
                {
                    cartItems.map(cartItem => 
                        <li key={cartItem.id} className="cart-item">
                            <img className="cart-item__image" src={cartItem.imageUrl}/>
                            <span>{cartItem.name}</span>
                            <span>{Math.round(cartItem.price * (1 - cartItem.discount))}</span>
                            <span>x{cartItem.quantity}</span>
                            <div className="cart-item__button-wrapper">
                            <button
                                className="cart-item__button"
                                onClick={() => {
                                    updateCart(cartItem, -1);
                                }}
                            >
                                -
                            </button>
                            <button
                            className="cart-item__button"
                                onClick={() => {
                                    updateCart(cartItem, 1);
                                }}
                            >
                                +
                            </button>
                            </div>
                        </li>
                    )
                }
            </ul>

        </section>
    );
}

export default CartContent;