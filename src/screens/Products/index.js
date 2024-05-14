import "./style.scss";
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getSessionProducts } from "../../services/session";
import { Range } from "react-range";
import Pagination from "../../components/Pagination";
import { AppContext } from "../../providers/AppProvider";

function Products() {
    const { updateCart } = useContext(AppContext);
    const componentProducts = getSessionProducts();
    const prices = componentProducts.map(product => product.price);
    const defaultPriceRange = [Math.min(...prices), Math.max(...prices)];
    const [formData, setFormData] = useState({ type: [], price: defaultPriceRange, name: "", categoryId: "Mind", color: ""});
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(componentProducts);
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const [categories, setCategories] = useState(["Mind", ...new Set(componentProducts.map(product => product.categoryId))]);
    //const colors = [...new Set(componentProducts.map(product => product.color))]
    const [filterColors, setFilterColors] = useState(
        [...new Set(componentProducts.map(product => product.color))].map(color => {return {id: `color-${color}`, value: color, label: color}})
    );

    useEffect(() => {
        applySearchParams();
    }, []);

    useEffect(() => {
        submitForm();
    }, [formData]);

    const filterTypes = [
        { id: "type-male", value: "male", label: "Férfi" },
        { id: "type-female", value: "female", label: "Női" },
    ];

    const getType = () => {
        switch (formData.type.length) {
            case 0:
                return "";
            case 1:
                return formData.type[0];
            case 2:
                return "unisex";
            default:
                return null;
        }
    };

    const updateSearchParams = () => {
        const newSearchParams = {
            type0: formData.type[0], 
            type1: formData.type[1],
            price0: formData.price[0], 
            price1: formData.price[1],
            name: formData.name, 
            categoryId: formData.categoryId, 
            color: formData.color,
            activePage: activePage
        }
        setSearchParams(newSearchParams);
    };

    const applySearchParams = () => {
        const newType = [searchParams.get("type0"), searchParams.get("type1")].filter(type => (type !== null) && (type === "male" || type === "female")),
        newPrice = [searchParams.get("price0"), searchParams.get("price1")].map(price => parseFloat(price)).filter(price => !isNaN(price)),
        newName = searchParams.get("name"),
        newCategoryId = searchParams.get("categoryId"),
        newColor = searchParams.get("color"),
        newActivePage = Math.floor(parseFloat(searchParams.get("activePage")));
        if (newPrice.length === 2 || newName || newCategoryId || newColor) {
            const newFormData = {
                type: newType, price: newPrice, name: newName, categoryId: newCategoryId, color: newColor
            }
            setFormData({...newFormData});
            console.log(newFormData);
        }
        if (!isNaN(newActivePage)) setActivePage(newActivePage);
    };

    const submitForm = () => {
        updateSearchParams();
        let resultItems = componentProducts;
        if (!!formData.name) {
            resultItems = resultItems.filter(resultItem => resultItem.name.toLowerCase().includes(formData.name.toLowerCase()));
        }
        if (formData.categoryId && formData.categoryId !== "Mind") {
            resultItems = resultItems.filter(resultItem => resultItem.categoryId === formData.categoryId)
        }
        if (!!formData.price.length) {
            resultItems = resultItems.filter(resultItem => {
                const cost = resultItem.price * (1 - resultItem.discount);
                return cost >= formData.price[0] && cost <= formData.price[1];
            })
        }
        if (!!formData.color) {
            resultItems = resultItems.filter(resultItem => resultItem.color === formData.color)
        }
        const type = getType();
        if (!!type) {
            resultItems = resultItems.filter(resultItem => resultItem.type === type);
        }
        resultItems = resultItems.toSorted((a, b) => { // sort by alphabetical order of result's name
            if (a.name < b.name) return -1; 
            if (a.name > b.name) return 1; 
            return 0;
        });
        setFilteredProducts(resultItems);
        if (((activePage - 1) * pageSize) >= resultItems.length) setActivePage(1);
    };

    return (
        <div className="screen-products">
            <div className="products-search">
                <aside className="products-search__filter">
                    <h2
                        className="products-search__title"
                        style={{ backgroundImage: "url(/img/product-search.jpg)" }}
                    >
                        Keresés
                    </h2>
                    <form className="form">
                        <div className="form-group">
                            <label className="form-control__label">Név</label>
                            <input
                                value={formData.name}
                                onChange={(event) => { setFormData({ ...formData, name: event.target.value }) }}
                                className="form-control"
                                type="text"
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-control__label">Kategória</label>
                            <select
                                onChange={(event) => { setFormData({ ...formData, categoryId: event.target.value }) }}
                                value={formData.categoryId}
                                className="form-control"
                                name="categoryId"
                            >
                                {categories.map((category, index) => 
                                    <option key={index} value={category}>{category}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-control__label">Ár</label>
                            <Range
                                className="price-range"
                                step={1000}
                                min={defaultPriceRange[0]}
                                max={defaultPriceRange[1]}
                                values={formData.price}
                                onChange={(values) => {
                                    setFormData({...formData, price: values});
                                }}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        className="price-range__track"
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        data-after={formData.price[props.key]}
                                        className="price-range__thumb"
                                    />
                                )}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-control__label">Szín</label>
                            <div className="form-control__radio-group">
                                {
                                    filterColors.map(filterColor =>
                                        <div key={filterColor.id} htmlFor={filterColor.id} className="form-control__radio-button">
                                            <label
                                                className="switch"
                                                style={{
                                                    backgroundColor:
                                                        filterColor.value === "white" ? "black" : "white"
                                                }
                                                }
                                                title={filterColor.label}
                                            >
                                                <input
                                                    className="form-control__radio-button-control"
                                                    type="radio"
                                                    id={filterColor.id}
                                                    name="color"
                                                    value={filterColor.value}
                                                    checked={formData.color === filterColor.value}
                                                    onClick={(event) => {
                                                        let newValue = event.target.value;
                                                        if (newValue === formData.color) {
                                                            event.target.checked = false;
                                                            newValue = "";
                                                        }
                                                        setFormData({ ...formData, color: newValue })
                                                    }}
                                                    onChange={() => {}}
                                                />
                                                <span
                                                    className="slider"
                                                    style={{ backgroundColor: filterColor.value }}
                                                ></span>
                                            </label>
                                            {/* <span>{filterColor.label}</span> */}
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-control__label">
                                Típus
                            </label>
                            {filterTypes.map(type =>
                                <label key={type.id} htmlFor={type.is} className="form-control__checkbox">
                                    <input
                                        className="form-control__checkbox-control"
                                        type="checkbox"
                                        id={type.id}
                                        name={`type_${type.value}`}
                                        checked={formData.type.includes(type.value)}
                                        onChange={(event) => {
                                            const isChecked = event.target.checked;
                                            let newValue = [...formData.type];
                                            if (isChecked) newValue = [...formData.type, type.value];
                                            else newValue = newValue.filter(value => value !== type.value);
                                            setFormData({ ...formData, type: newValue });
                                        }}
                                    />
                                    <span>{type.label}</span>
                                </label>
                            )}
                        </div>

                        {/* <div className="form-group">
                            <input type="button" onClick={() => { submitForm() }} className="button" value="Keresés indítása" />
                        </div> */}
                    </form>
                </aside>
                <div className="products-search__result-items">
                    <h2
                        className="products-search__title products-search__title--results"
                        style={{ backgroundImage: "url(/img/product-search2.jpg)" }}
                    >
                        Találatok
                    </h2>
                    {
                        filteredProducts.length === 0 ?
                        <div className="no-results-message">
                            <h3 className="no-results-message__headline">Nincs találat.</h3>
                            <p className="no-results-message__content">Módosítsd a keresési paramétereket!</p>
                        </div>
                        :
                        filteredProducts.slice((activePage - 1) * pageSize, ((activePage - 1) * pageSize) + pageSize).map(product =>
                            <div
                                key={product.id}
                                className={`result-item`}
                            >
                                {
                                    product.discount > 0 &&
                                    <p className="discount-ribbon">
                                        {product.discount * 100}%
                                    </p>
                                }
                                <img className="result-item__image" src={product.imageUrl} />
                                <div className="result-item__information">
                                    <h3 className="result-item__name">
                                        {product.name}
                                    </h3>
                                    <h4 className="result-item__cost">
                                        {Math.round(product.price * (1 - product.discount))} {product.currency}
                                    </h4>
                                    {
                                        product.discount > 0 &&
                                        <h5 className="result-item__price">
                                            {product.price} {product.currency}
                                        </h5>
                                    }
                                    <button 
                                        className="button"
                                        onClick={() => {
                                            updateCart(product, 1);
                                        }}
                                    >
                                        Kosárba teszem
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    <Pagination 
                        activePage={activePage} 
                        pageSize={pageSize} 
                        itemsLength={filteredProducts.length} 
                        onPageClick={setActivePage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Products;