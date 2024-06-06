import "./style.scss";
import { useEffect, useState } from "react";
import { store, removeNotificationById } from "../../services/global-state";

function Notifications() {
    const getStoreNotes = () => store.getState().notifications.items;

    const [notifications, setNotifications] = useState(getStoreNotes());

    useEffect(() => {
        store.subscribe(() => {
            setNotifications(getStoreNotes());
        });
    }, []);

    const deleteNotification = event => {
        const id = parseFloat(event.target.dataset.id);
        store.dispatch(removeNotificationById(id));
    }

    return (
        <section className="component-notifications">
            {
                notifications.map(notification =>
                    <div
                        key={notification.id}
                        className="component-notifications__item"
                        onAnimationEnd={deleteNotification}
                        data-id={notification.id}
                    >
                        <button
                            className="item__close-button"
                            data-id={notification.id}
                            onClick={deleteNotification}
                        >
                            X
                        </button>
                        <p className="item__message">
                            {notification.message}
                        </p>
                    </div>
                )
            }
        </section>
    );
}

export default Notifications;