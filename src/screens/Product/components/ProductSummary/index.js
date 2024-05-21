import "./style.scss";
import { AppContext } from "../../../../providers/AppProvider";
import { useContext, useEffect } from "react";
import { useState } from "react";

function ProductSummary({product = {}}) {
    const {cartItems, updateCart} = useContext(AppContext);

    const deliveryProviders = [
        {
            name: "DPD",
            price: 5,
            currency: "EUR",
            maxDaysToDeliver: 1
        },
        {
            name: "GLS",
            price: 999,
            currency: "HUF",
            maxDaysToDeliver: 2
        },
        {
            name: "POSTA",
            price: 1390,
            currency: "HUF",
            maxDaysToDeliver: 3
        }
    ];

    const [selectedProvider, setSelectedProvider] = useState(deliveryProviders[0]);

    const selectProvider = (changeEvent) => {
        const newProvider = deliveryProviders.find(provider => provider.name === changeEvent.target.value);
        setSelectedProvider(newProvider);
    };

    const getDeliveryInterval = () => {
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 1);
        const today = `${todayDate.getFullYear()}.${todayDate.getMonth() + 1}.${todayDate.getDate()}`;

        const maxDeliveryDate = new Date();
        maxDeliveryDate.setDate(maxDeliveryDate.getDate() + selectedProvider.maxDaysToDeliver);
        const maxDelivery = `${maxDeliveryDate.getFullYear()}.${maxDeliveryDate.getMonth() + 1}.${maxDeliveryDate.getDate()}`;
        
        return `${today}${maxDeliveryDate.getTime() === todayDate.getTime() ? "" : " - " + maxDelivery}`;
    }

    return (
        <section className="component-product-summary">
            <p className="component-product-summary__price">
                {Math.round(product.price * (1 - product.discount))} {product.currency}
            </p>
            <p className="component-product-summary__category">
                {product.categoryId}
            </p>
            <button 
                className="button"
                onClick={() => {
                    updateCart(product, 1)
                }}
            >
                Kosárba rakom
            </button>
            <div className="delivery-info">
                <h3 className="delivery-info__headline">
                    Szállítási információk
                </h3>
                <p className="delivery-info__date">
                    {getDeliveryInterval()}
                </p>
                <div className="delivery-info__providers">
                    {
                        deliveryProviders.map(provider => 
                            <label key={provider.name} className="delivery-info__provider">
                                <input 
                                    type="radio" 
                                    name="provider"
                                    value={provider.name}
                                    checked={provider.name === selectedProvider.name}
                                    onChange={selectProvider}
                                />
                                {provider.name}
                            </label>
                        )
                    }
                    <div className="delivery-info__price">
                        <h4 className="delivery-info__price-label">Ár:</h4>
                        <p className="delivery-info__cost">
                            {selectedProvider.price} {selectedProvider.currency}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductSummary;