import { useState, useEffect } from "react";
import "./style.scss";

const GAME_STATES = {
    ready: "ready",
    gameOver: "gameOver",
    win: "win",
    pause: "pause"
}

function Game() {

    const randInt = (max) => {
        return Math.floor(max * Math.random());
    }

    const shuffle = (array) => {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = randInt(currentIndex);//Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const availableImages = [
        "./img/game/mars.jpg",
        "./img/game/moon.jpg",
        "./img/game/venus.jpg",
        "./img/game/neptune.jpg",
    ];

    const trivia = [
        [
            "This planet is also known as the Red Planet.",
            "This planet is named after the Roman god of war.",
            "This planet has 2 moons called Deimos and Phobos.",
            "This planet is the 4th planet from the sun.",
            "This planet is smaller than Earth with a diameter of 4217 miles"
        ],
        [
            "Its surface is actually dark.",
            "The Sun and IT are not the same size.",
            "It is drifting away from the Earth.",
            "It was made when a rock smashed into Earth.",
            "It makes the Earth move as well as the tides.",
        ],
        [
            "A day on this planet is longer than a year.",
            "This planet is hotter than Mercury – despite being further away from the Sun.",
            "This planet spins clockwise on its axis.",
            "This planet is the second brightest natural object in the night sky after the Moon.",
            "This planet has 90 times the atmospheric pressure of Earth."
        ],
        [
            "This planet is the Most Distant Planet",
            "This planet is the Smallest of the Gas Giants",
            "Its Surface Gravity is Almost Earth-like",
            "The Discovery of This planet is Still a Controversy",
            "This planet has the Strongest Winds in the Solar System"
        ]
    ];

    const [winnerSequence, setWinnerSequence] = useState(shuffle([...new Array(availableImages.length)].map((element, index) => index)));

    const gameAreaSize = 4;
    const createGameElements = () => {
        const gameElements = new Array();
        for (let r = 0; r < gameAreaSize; r++) {
            gameElements.push(new Array);
            for (let e = 0; e < gameAreaSize; e++) {
                gameElements[r][e] = { backgroundImage: availableImages[randInt(gameAreaSize)] };
            }
        }
        return gameElements;
    }
    const [gameState, setGameState] = useState(GAME_STATES.ready);
    const [gameElements, setGameElements] = useState(createGameElements());

    const getRandomImage = (currentImage) => {
        let randomImage = currentImage;
        while (randomImage === currentImage) {
            const randomImageIndex = Math.floor(Math.random() * availableImages.length);
            randomImage = availableImages[randomImageIndex];
        }
        return randomImage;
    }

    const changeElement = (rowIndex, elementIndex) => {
        let newGameElements = [...gameElements];
        const currentElement = newGameElements[rowIndex][elementIndex];
        currentElement.backgroundImage = getRandomImage(currentElement.backgroundImage);
        setGameElements(newGameElements);
    };

    const checkGameState = () => {
        let win = false;

        const winnerImagesOfGameRows = [
            availableImages[winnerSequence[0]],
            availableImages[winnerSequence[1]],
            availableImages[winnerSequence[2]],
            availableImages[winnerSequence[3]]
        ];

        win = gameElements.every((row, rowIndex) =>
            row.every(gameElement => gameElement.backgroundImage === winnerImagesOfGameRows[rowIndex])
        );

        if (win) {
            setGameState(GAME_STATES.win);
        } else {
            setGameState(GAME_STATES.ready);
        }
    };

    useEffect(() => {
        checkGameState();
    }, [gameElements]);

    return (
        <section className={`screen-game ${gameState === GAME_STATES.win ? "won" : ""}`} style={{ backgroundImage: "url(/img/game/game-background.jpg)" }}>

            {
                gameState === GAME_STATES.win ?
                    <>
                        <h2 className="won-title">
                            Nyertél!
                        </h2>
                        <div className="won-wrapper" style={{ backgroundImage: "url(/img/game/earth.jpg)" }}>
                        </div>
                    </>
                    :
                    <div className="container">
                        <h2 className="game__title">Nyereményjáték</h2>
                        <p className="game__headline">
                            Kattints a bolygóra, hogy leváltsd a képét. Egy sorban csak egy féle bolygó lehet. De melyik? Tippekért tartsd a "?" gombot. (Változnak, amikor a kép is.)
                        </p>
                        <div className="game__area">
                            {
                                gameElements.map((gameRow, gameRowIndex) =>
                                    <div
                                        key={gameRowIndex}
                                        className="game__row"
                                        // title={}
                                    >
                                        {
                                            gameRow.map((gameElement, gameElementIndex) =>
                                                <div
                                                    key={gameElementIndex}
                                                    className="game__element"
                                                    style={{ backgroundImage: `url(${gameElement.backgroundImage})` }}
                                                    onClick={() => {
                                                        changeElement(gameRowIndex, gameElementIndex);
                                                    }}
                                                ></div>
                                            )
                                        }
                                        <div className="clue">
                                            <button className="clue__button">?</button>
                                            <p className="clue__content">
                                                {
                                                    trivia[
                                                        winnerSequence[gameRowIndex]][randInt(trivia[winnerSequence[gameRowIndex]].length)
                                                    ]
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }

        </section>
    )
}

export default Game;