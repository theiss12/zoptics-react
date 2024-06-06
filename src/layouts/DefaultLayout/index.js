import "./style.scss";
import Navigation from "../../components/Navigation";
import Notifications from "../../components/Notification";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <div className="default-layout">
            <Navigation />
            <Notifications />
            <Outlet />
        </div>
    );
}

export default DefaultLayout;