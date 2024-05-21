import { useState } from "react";
import "./style.scss";

function ContentSwitcher({contents = []}) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <section className="component-content-switcher">
            <div className="component-content-switcher__tabs">
                {
                    contents.map((content, index) => 
                        <button
                            key={index} 
                            className={`component-content-switcher__tab ${activeTabIndex === index ? "component-content-switcher__tab--active" : ""}`}
                            onClick={() => {setActiveTabIndex(index);}}
                        >
                            {content.label}
                        </button>
                    )
                }
            </div>
            <p className="component-content-switcher__content">
                {contents[activeTabIndex].content}
            </p>
        </section>
    );
}

export default ContentSwitcher;