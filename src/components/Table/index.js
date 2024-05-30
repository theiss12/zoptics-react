import "./style.scss";

function Table({data = []}) {
    return (
        <table className="component-table">
            <thead>
                <tr>
                    {data.headers.map((header, headerIndex) => 
                        <th {...(header.colspan ? {colSpan: header.colspan} : {})} key={headerIndex}>
                            {header.label}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    data.body.map((row, rowIndex) => 
                        <tr key={rowIndex}>
                            {
                                row.map((field, fieldIndex) => 
                                    <td key={fieldIndex}>{field}</td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default Table