import "./style.scss";
import Teaser from "../../components/Teaser";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { loadData } from "../../services/api";

function Blog({articles}) {

    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    return (
        <div className="screen-blog">
            <div className="container">
                <h2 className="screen-blog__title">Legfrissebb hírek</h2>
                {articles.slice((activePage - 1) * pageSize, ((activePage - 1) * pageSize) + pageSize).map((article, order) => 
                    <Teaser key={article.id} article={article} order={order}/>
                )}
                <Pagination activePage={activePage} pageSize={pageSize} itemsLength={articles.length} onPageClick={setActivePage}/>
            </div>
        </div>
    )
}

export default Blog;