import { useEffect, useState } from "react";
import "./style.scss";

function Gallery({imageSources = []}) {
    const [currentImageSourceIndex, setCurrentImageSourceIndex] = useState(0);
    const [displayLargeImage, setDisplayLargeImage] = useState(false);

    const navigateImages = (change) => {
        let newIndex = currentImageSourceIndex + change;
        const maxIndex = imageSources.length - 1;
        if (newIndex < 0) newIndex = maxIndex;
        if (newIndex > maxIndex) newIndex = 0;
        setCurrentImageSourceIndex(newIndex);
    }

    useEffect(() => {
        setCurrentImageSourceIndex(0);
    }, [imageSources]);

    return (
        <section className="component-gallery">
            <div 
                className={`component-gallery__inspector ${displayLargeImage ? "on" : "off"}`}
            >
                <button
                    className="component-gallery__inspector-close-button"
                    onClick={() => {
                        setDisplayLargeImage(false);
                    }}
                >
                    ✖
                </button>
                <img 
                    className="component-gallery__inspector-image"
                    src={imageSources[currentImageSourceIndex]}
                />
                <button 
                    className="component-gallery__inspector-navigation left"
                    onClick={() => {navigateImages(-1)}}
                >
                    {"<"}
                </button>
                <button 
                    className="component-gallery__inspector-navigation right"
                    onClick={() => {navigateImages(1)}}
                >
                    {">"}
                </button>
            </div>
            <img 
                className="component-gallery__current-image" 
                src={imageSources[currentImageSourceIndex]} 
                onClick={() => {
                    setDisplayLargeImage(true);
                }}
            />
            <div className="component-gallery__images">
                {
                    imageSources.map((imageSource, index) => 
                        <img
                            key={index}
                            className="component-gallery__image"
                            src={imageSource}
                            onClick={() => setCurrentImageSourceIndex(index)}
                        />
                    )
                }
            </div>
        </section>
    );
}

export default Gallery;