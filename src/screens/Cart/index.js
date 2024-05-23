import "./style.scss";
import CartItems from "../../components/CartItems";
import { Link } from "react-router-dom";
import { getSessionCart } from "../../services/session";

function Cart() {
    return (
        <section className="screen-cart">
            <div className="container">
                <CartItems />
                {
                    getSessionCart().length > 0 &&
                    <Link to={"/checkout"} className="button checkout">Kasszához</Link>
                }
            </div>
        </section>
        
    )
}

export default Cart;