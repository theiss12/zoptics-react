import "./style.css";
import Button from "../Button";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function Tiles({items}) {
    const [numberOfTilesInRow, setNumberOfTilesInRow] = useState(3);

    useLayoutEffect(() => {
		const updateSize = () => {
            setNumberOfTilesInRow(window.innerWidth > 768 ? 3 : 2);
		};

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

    const breakUpItems = () => {
        const rows = [
			[]
		];

		items.forEach(element => {
			// if the last row (rows[rows.length -1]) has less element than the defined number of elements
			if (rows[rows.length - 1].length < numberOfTilesInRow) {
				rows[rows.length - 1].push(element);
			} else {
				rows.push([element]);
			}
		});

		return rows;
    };

    const navigate = useNavigate();

    return (
        <section className="component-tiles">
            <div className="container">
                <h2 className="title">
                    Referenciák
                </h2>
                <div className="tiles">
                    {
                        breakUpItems().map(
                            (row, rowIndex) =>
                            <div key={rowIndex} className="row">
                                {
                                    row.map(
                                        tile =>
                                        <div 
                                            key={tile.id}
                                            className={`tile tile--${numberOfTilesInRow === 3 ? tile.size : tile.sizeMobile}`}
                                            style={{backgroundImage: `url(${tile.imageUrl})`}}
                                        >
                                            {/* <button className="button">
                                                Részletek
                                            </button> */}
                                            <Button value="Részletek" onClick={() => {navigate("/placeholder")}}/>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Tiles;