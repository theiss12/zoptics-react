import "./style.scss";
import Table from "../../../../components/Table";
import Message from "../../../../components/Message";
import { useState, useContext } from "react";
import { AppContext } from "../../../../providers/AppProvider"
import { useNavigate } from "react-router-dom";

function Summary({formData = {}, setFormData = () => {}}) {
    const [isMessageActive, setIsMessageActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const billingTableData = {
        headers: [
            {label: "Számlázás", colspan: 2}
        ],
        body: [
            [formData.company ? "Cégnév" : "Vezetéknév", formData.fname],
            [formData.company ? "Adószám" : "Keresztnév", formData.lname],
            ["E-Mail", formData.email],
            ["Telefon", formData.phone],
            ["Irányítószám", formData.zip],
            ["Település", formData.city],
            ["Utca/Házszám", `${formData.street}/${formData.house}`]
        ]
    };

    const shippingTableData = {
        headers: [
            {label: "Kiszállítás", colspan: 2}
        ],
        body: [
            ["Vezetéknév", formData.shipping.fname],
            ["Keresztnév", formData.shipping.lname],
            ["E-Mail", formData.shipping.email],
            ["Telefon", formData.shipping.phone],
            ["Irányítószám", formData.shipping.zip],
            ["Település", formData.shipping.city],
            ["Utca/Házszám", `${formData.shipping.street}/${formData.shipping.house}`]
        ]
    };

    const paymentTypes = [
        {id:"cash", label: "Utánvét"},
        {id:"bank-transfer", label: "Utalás"},
        {id:"card", label: "Bankkártya"}
    ];

    const getEmptyKey = () => {
        const testData = {...formData, company: "skip"};
        let emptyKey = Object.keys(testData).find(key => !testData[key]); // try getting a FALSY result
        if (emptyKey) {
            return emptyKey;
        }
        emptyKey = Object.keys(testData.shipping).find(key => !testData.shipping[key]);
        if (emptyKey) {
            return "shipping_" + emptyKey;
        }
        return undefined;
    };

    const navigate = useNavigate();
    const {cartItems, updateCart} = useContext(AppContext);
    const emptyCart = () => {
        // console.log(cartItems, updateCart);
        cartItems.forEach(cartItem => updateCart(cartItem, -cartItem.quantity));
        navigate("/");
    };

    return(
        <section className="component-summary">
            <div className="component-summary__tables">
                <Table data={billingTableData}/>
                <Table data={shippingTableData} />
            </div>
            
            <div className="checkout-payment">
                <h3 className="checkout-payment__title">
                    Összeg: {formData.totalPrice} HUF
                </h3>
                <p className="checkout-payment__options">
                    {
                        paymentTypes.map(paymentType => 
                            <label key={paymentType.id} className="checkout-payment__option">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value={paymentType.id}
                                    checked={paymentType.id === formData.paymentType}
                                    onChange={changeEvent => {
                                        const newFormData = {
                                            ...formData,
                                            paymentType: changeEvent.target.value
                                        };
                                        // console.log(newFormData);
                                        setFormData(newFormData);
                                    }}
                                />
                                {paymentType.label}
                            </label>
                        )
                    }
                </p>
                <button 
                    className="checkout-payment__button"
                    onClick={() => {
                        const emptyKey = getEmptyKey();

                        if (emptyKey) {
                            const dataType = emptyKey.includes("shipping") ? "szállítási" : "számlázási";
                            setErrorMessage(`A ${dataType} adatok közt van még kitöltetlen mező. A folytatáshoz ezeket ki kell tölteni.`);
                            setIsMessageActive(true);
                            return;
                        }

                        emptyCart();
                        window.scroll(0,0);
                    }}
                >
                    Megrendelés
                </button>
            </div>
            <Message 
                active={isMessageActive} 
                title="Hiba történt." 
                description={errorMessage}
                activeStateSetter={setIsMessageActive}
            />
        </section>
    );
}

export default Summary;