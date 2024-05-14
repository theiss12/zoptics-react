import "./style.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../providers/AppProvider";

function CartItems(/*{cartItems = [], updateCart}*/) {

    const {cartItems, updateCart} = useContext(AppContext);

    const buryCartItem = (transitionEndEvent, cartItem) => {
        if (transitionEndEvent.target.className === "cart-item dead") {
            updateCart(cartItem, -1);
        }
    }

    const deletetCartItem = (cartItemQuantity, cartItem) => {
        for (var i = 0; i < cartItemQuantity; i++) {
            updateCart(cartItem, -1)
        }
    }

    const navigate = useNavigate();

    const navigatToProducts = () => {
        navigate("/products");
    }

    return(
        <section className="screen-cart">
            <div className="container">
                <h2 className="title">
                    Kosár
                </h2>
                <div className="cart-items">
                    {
                        cartItems.length === 0 ? 
                        <div className="empty-cart-message">
                            <h3 className="empty-cart-message__headline">
                                A kosarad üres!
                            </h3>
                            <p className="empty-cart-message__information">
                                (A kosárba helyezett termékek itt jelennek meg.)
                            </p>
                            <button className="button" onClick={navigatToProducts}>
                                Termékekhez
                            </button>
                        </div> 
                        : 
                        cartItems.map(cartItem => 
                            <div 
                                key={cartItem.id} 
                                className={`cart-item ${cartItem.quantity === 0 ? "dead" : ""}`}
                                onTransitionEnd={(transitionEndEvent) => {
                                    buryCartItem(transitionEndEvent, cartItem);
                                }}
                            >
                                {
                                    cartItem.discount > 0 &&
                                    <p className="discount-ribbon">
                                        {cartItem.discount * 100}%
                                    </p>
                                }
                                <button 
                                    className="cart-item__delete-button"
                                    onClick={() => {
                                        deletetCartItem(cartItem.quantity, cartItem);
                                    }}
                                >
                                    <img className="delete-button-image" src="/img/wastebasket.png" alt="🗑️"/>
                                </button>
                                <img className="cart-item__image" src={cartItem.imageUrl} />
                                <div className="cart-item__information">
                                    <h3 className="cart-item__name">
                                        {cartItem.name}
                                    </h3>
                                    <p className="cart-item__price-label">
                                        Végösszeg
                                    </p>
                                    <h4 className="cart-item__cost">
                                        {Math.round(cartItem.price * (1 - cartItem.discount)) * cartItem.quantity} {cartItem.currency}
                                    </h4>
                                    {
                                        cartItem.discount > 0 &&
                                        <h5 className="cart-item__price">
                                            {cartItem.price} {cartItem.currency}
                                        </h5>
                                    }
                                    <div className="cart-item__quantity">
                                        <button 
                                            className="change-quantity-button" 
                                            onClick={() => {
                                                if (cartItem.quantity === 0) return; // block further change
                                                updateCart(cartItem, -1)
                                            }}
                                        >
                                            -
                                        </button>
                                        <span className="selected-quantity">
                                            {cartItem.quantity}
                                        </span>
                                        <button 
                                            className="change-quantity-button" 
                                            onClick={() => {
                                                if (cartItem.quantity === 0) return; // block further change
                                                updateCart(cartItem, 1);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default CartItems;