import "./style.scss";
import CartItems from "../../components/CartItems";
import { Link } from "react-router-dom";
import { AppContext } from "../../providers/AppProvider";
import { useContext } from "react";

function Cart() {
    const {cartItems} = useContext(AppContext);
    return (
        <section className="screen-cart">
            <div className="container">
                <CartItems />
                {
                    cartItems.length > 0 &&
                    <Link to={"/checkout"} className="button checkout">Kasszához</Link>
                }
            </div>
        </section>
        
    )
}

export default Cart;