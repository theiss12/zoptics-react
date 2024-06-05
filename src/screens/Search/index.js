import "./style.scss";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSessionProducts } from "../../services/session";
import Pagination from "../../components/Pagination";

function Search({articles = []}) {
    //const { searchTerm } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    // const [articles, setArticles] = useState([]);
    const [resultItems, setResultItems] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(5);


    const filterResultItems = resultItem => {
        // return JSON.stringify(resultItem).includes(searchTerm);
        const searchProperties = ["title", "description"];
        let matchFound = false;
        searchProperties.forEach(property => {
            if (!resultItem[property]) {
                return;
            } else {
                resultItem[property] = resultItem[property].toString();
            }
            if (resultItem[property].toLowerCase().includes(searchTerm.toLowerCase())) {
                matchFound = true;
            }
        });
        return matchFound;
    }

    const executeSearch = () => {
        const products = getSessionProducts();
        const newResultItems = [
            ...products.map(product => {
                return {
                    title: product.name, 
                    details: product.categoryId, 
                    imageUrl: product.imageUrl,
                    endpoint: `/products/${product.slug}`,
                    type: "Termék"
                }
            }), 
            ...articles.map(article => {
                return {
                    title: article.headline,
                    details: article.abstract,
                    imageUrl: `/img/${article.imageUrl}`,
                    endpoint: `/blog/${article.slug}`,
                    type: "Cikk"
                }
            })
        ].filter(filterResultItems);
        setResultItems(newResultItems);
    };

    const { state } = useLocation();

    useEffect(() => {
        setSearchTerm(searchParams.get("searchTerm"));
    }, []);

    useEffect(() => {
        setSearchTerm(searchParams.get("searchTerm"));
    }, [state]);

    useEffect(() => {
        executeSearch();
        setActivePage(1);
    }, [searchTerm, articles])

    return (
        <section className="screen-search">
            <div className="container">
                <h2 className="search__title">Keresési eredmények</h2>

                <h3 className="search__subtitle">
                    <span>Kulcsszó:</span> "{!!searchTerm ? searchTerm : "-"}"
                </h3>

                <ul className="search__result-items">
                    {
                        resultItems.length > 0 ?
                        resultItems.slice((activePage - 1) * pageSize, ((activePage - 1) * pageSize) + pageSize).map((resultItem, index) =>
                            <li key={index} className={`search__result-item`}>
                                <img
                                    className="search__result-item-media"
                                    src={resultItem.imageUrl}
                                />
                                <div className="search__result-item-description">
                                    <p className="search__result-item-category">
                                        Kategória: {resultItem.type}
                                    </p>
                                    <h3 className="search__result-item-title">
                                        <Link to={resultItem.endpoint}>
                                            {resultItem.title}
                                        </Link>
                                    </h3>
                                    <p className="search__result-item-details">
                                        {
                                            resultItem.details
                                        }
                                    </p>
                                    <Link to={resultItem.endpoint} className="search__result-item-link">Részletek</Link>
                                </div>
                            </li>
                        ) :
                        <div className="no-results">
                            <h2 className="no-results__headline">
                                Nincs találat erre a kifejezésre.
                            </h2>
                            <p className="no-results__message">
                                Írj be egy másikat...
                            </p>
                        </div>
                    }
                </ul>
                <Pagination
                    className="screen-search__pagination"
                    activePage={activePage} 
                    pageSize={pageSize} 
                    itemsLength={resultItems.length} 
                    onPageClick={setActivePage}
                />
            </div>
        </section>
    )
}

export default Search;