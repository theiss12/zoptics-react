import "./style.scss";

function Message({active = false, title = "", description = "", activeStateSetter, yesNoSetter}) {
    
    return (
        <section className={`component-message ${active ? "component-message--active" : ""}`}>
            <div className="component-message__box">
                <h2 className="component-message__title">
                    {title}
                </h2>
                <p className="component-message__description">
                    {description}
                </p>
                <p className="component-message__buttons">
                    <button
                        className="button"
                        onClick={() => {
                            activeStateSetter(false);
                            if (yesNoSetter) {
                                yesNoSetter(true);
                            }
                        }}
                    >
                        {yesNoSetter ? "Igen" : "OK"}
                    </button>
                    {
                        yesNoSetter && 
                        <button
                            className="button"
                            onClick={() => {
                                activeStateSetter(false);
                                yesNoSetter(false);
                            }}
                        >
                            Nem
                        </button>
                    }
                </p>
            </div>
        </section>
    );
}

export default Message;