import "./style.scss";
import { useEffect, useState } from "react";

function Notifications({changable = [], defaultMessage = ""}) {

    const [numItems, setNumItems] = useState(changable.length);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (changable.length > numItems) {
            const newId = notifications.length + 1;
            const newNotifications = [...notifications, {id: newId}];
            setNotifications(newNotifications);
        }
        setNumItems(changable.length);
    }, [changable]);

    const deleteNotification = toDelete => {
        const newNotifications = notifications.filter(notification => notification.id !== toDelete.id);
        setNotifications(newNotifications);
    }

    return (
        <section className="component-notifications">
            {
                notifications.map(notification =>
                    <div
                        key={notification.id}
                        className="component-notifications__item"
                        onAnimationEnd={() => {
                            deleteNotification(notification);
                        }}
                    >
                        <button
                            className="item__close-button"
                            onClick={() => {
                                deleteNotification(notification);
                            }}
                        >
                            X
                        </button>
                        <p className="item__message">
                            {defaultMessage}
                        </p>
                    </div>
                )
            }
        </section>
    );
}

export default Notifications;