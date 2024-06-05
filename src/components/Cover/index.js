import "./style.css";
import { useState } from "react";

function Cover( {slides} ) {

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState("up");

    const showSlideByIndex = (slideIndex) => {
        setActiveSlideIndex(slideIndex);
    }

    const showNextSlide = () => {
        let newSlideIndex = activeSlideIndex + 1;
        if (newSlideIndex > slides.length - 1) {
            newSlideIndex = 0;
        }
        /* ha kisebb vagy nagyobb az új, az alapján egy új class-t adjunk neki: left / right */
        showSlideByIndex(newSlideIndex);
        setAnimationDirection("right")
    };

    const showPreviousSlide = () => {
        let newSlideIndex = activeSlideIndex - 1;
        if (newSlideIndex < 0) {
            newSlideIndex = slides.length - 1;
        }
        showSlideByIndex(newSlideIndex);
        setAnimationDirection("left");
    };

    return (
        <section className="component-cover">
            <div className="slides">
                {
                    slides.map((slide, slideIndex) =>
                        <div 
                            key={slide.id} 
                            className={`slide ${slideIndex===activeSlideIndex?"active":""} ${animationDirection}`} 
                            style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        >
                            <h2 className="title">
                                {slide.title}
                            </h2>
                            <h3 className="headline">
                                {slide.headline}
                            </h3>
                        </div>
                    )
                }

            </div>
            <button 
                className="slide-navigation-button previous"
                onClick={ showPreviousSlide }
            >
                {/* <svg className="arrow" width="10" height="10">
                    <defs>
                        <filter id="f3" width="120" height="120">
                            <feOffset in="SourceAlpha" dx="0" dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feBlend in="SourceGraphic" in2="blurOut" />
                        </filter>
                    </defs>
                    <polygon points="0,5 10,0 10,10"
                        style={{ fill: "white" }} filter="url(#f3)" />
                </svg> */}
                <span className="triangle"></span>
            </button>
            <button 
                className="slide-navigation-button next"
                onClick={ showNextSlide }
            >
                {/* <svg className="arrow" width="10" height="10">
                    <defs>
                        <filter id="f3" width="120" height="120">
                            <feOffset in="SourceAlpha" dx="0" dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feBlend in="SourceGraphic" in2="blurOut" />
                        </filter>
                    </defs>
                    <polygon points="10,5 0,0 0,10"
                        style={{ fill: "white" }} filter="url(#f3)" />
                </svg> */}
                <span className="triangle"></span>
            </button>
            <ul className="slide-navigation-pagination">
                {
                    slides.map((slide, slideIndex) => 
                        <li key={slide.id}>
                            <button 
                                className={slideIndex===activeSlideIndex?"active":""}
                                onClick={() => {
                                        setAnimationDirection("up");
                                        showSlideByIndex(slideIndex);
                                    }
                                }
                            >
                                {" "}
                            </button>
                        </li>
                    )
                }
            </ul>
        </section>
    );
}

export default Cover;