import "./style.scss";
import Navigation from "../../components/Navigation";
import Notifications from "../../components/Notification";
import { AppContext } from "../../providers/AppProvider";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function DefaultLayout() {

    const { cartItems } = useContext(AppContext);

    return (
        <div className="default-layout">
            <Navigation />
            <Notifications changable={cartItems} defaultMessage="A termék bekerült a kosaradba"/>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;