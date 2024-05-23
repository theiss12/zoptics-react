import { useState } from "react";
import "./style.scss";

function Collapsable({paragraph = {headline: "", content: ""}, collapsed = true}) {
    const [collapsedState, setCollapsedState] = useState(collapsed);
    
    return (
        <section className="component-collapsable">
            <h2 className="component-collapsable__headline">
                <span>{paragraph.headline}</span>
                <label className="component-collapsable__toggle">
                    <input
                        type="checkbox"
                        checked={collapsedState}
                        onChange={() => setCollapsedState(!collapsedState)}
                    />
                </label>
            </h2>
            <p className={`component-collapsable__content ${collapsedState ? "component-collapsable__content--collapsed" : ""}`}>
                {paragraph.content}
            </p>
        </section>
    );
}

export default Collapsable;