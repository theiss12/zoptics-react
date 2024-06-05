import { useEffect, useRef } from "react";
import "./style.scss";

function Page({title = "", headline = "", description = ""}) {
    const descriptionRef = useRef(null);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        descriptionRef.current.innerHTML = description;
    }, [description]);

    return (
        <section className="screen-page">
            <div className="container">
                <h2 className="screen-page__title">
                    {title}
                </h2>
                <h3 className="screen-page__headline">
                    {headline}
                </h3>
                <article className="screen-page__description" ref={descriptionRef}>
                </article>
            </div>
        </section>
    );
}

export default Page;