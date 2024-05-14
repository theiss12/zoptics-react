import "./style.css";
import Button from "../Button";

function Tiles({items}) {

    const breakUpItems = () => {
        const rows = [
			[]
		];

		items.forEach(element => {
			// if the last row (rows[rows.length -1]) has less element than the defined number of elements
			if (rows[rows.length - 1].length < 3) {
				rows[rows.length - 1].push(element);
			} else {
				rows.push([element]);
			}
		});

		return rows;
    };

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
                                            className={`tile ${tile.size === "big" ? "tile--big" : ""}`}
                                            style={{backgroundImage: `url(${tile.imageUrl})`}}
                                        >
                                            {/* <button className="button">
                                                Részletek
                                            </button> */}
                                            <Button value="Részletek"/>
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