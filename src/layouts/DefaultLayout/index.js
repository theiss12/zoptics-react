import "./style.scss";
import Navigation from "../../components/Navigation";
import { Outlet } from "react-router-dom";

function DefaultLayout({cartItems}) {
    return (
        <div className="default-layout">
            <Navigation cartItems={cartItems}/>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;