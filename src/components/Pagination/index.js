// myItems.slice((activePage - 1) * pageSize, ((activePage - 1) * pageSize) + pageSize).map(

import "./style.scss";

function Pagination({ activePage, pageSize, itemsLength, onPageClick }) {
    const paginationButtons = [];
    for (let index = 0, numButtons = itemsLength / pageSize; index < numButtons; index++) {
        paginationButtons.push(
            <input
                key={index}
                type="button"
                className={`component-pagination__button ${
                    index + 1 === activePage ? "active" : ""
                }`}
                value={index + 1}
                onClick={(event) => {
                    onPageClick(parseInt(event.target.value));
                    window.scroll(0, 0);
                }}
            />
        )
    }
    return (
        <div className="component-pagination">{paginationButtons}</div>
    )
}

export default Pagination;