import "./style.scss";
import Collapsable from "../../components/Collapsable";
import { loadData } from "../../services/api";
import { useEffect, useState } from "react";

function Terms() {
    const [terms, setTerms] = useState([]);
    useEffect(() => {
        loadData("terms", setTerms, () => {});
    }, []);

    return(
        <section className="screen-terms">
            <div className="container">
                {
                    terms.map((paragraph, index) => 
                        <Collapsable key={index} paragraph={paragraph} collapsed={false}/>
                    )
                }
            </div>
        </section>
    );
}

export default Terms;