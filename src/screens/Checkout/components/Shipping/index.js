import "./style.scss";
import { useState, useEffect } from "react";

function Shipping({formData = {}, setFormData = () => {}}) {
    const [isCompany, setIsCompany] = useState(false);

    const inputGroups = [
        {
            id: "id",
            label: "Azonosság",
            inputs: [
                {
                    label: isCompany ? "Cégnév" : "Vezetéknév",
                    type: "text",
                    name: "fname"
                },
                {
                    label: isCompany ? "Adószám" : "Keresztnév",
                    type: "text",
                    name: "lname"
                }
            ]
        },
        {
            id: "contact",
            label: "Elérhetőség",
            inputs: [
                {
                    label: "Telefon",
                    type: "tel",
                    name: "phone"
                },
                {
                    label: "E-Mail",
                    type: "email",
                    name: "email"
                }
            ]
        },
        {
            id: "address",
            label: "Cím",
            inputs: [
                {
                    label: "Irányítószám",
                    type: "text",
                    name: "zip"
                },
                {
                    label: "Település",
                    type: "text",
                    name: "city"
                },
                {
                    label: "Utca",
                    type: "text",
                    name: "street"
                },
                {
                    label: "Házszám",
                    type: "text",
                    name: "house"
                }
            ]
        },
    ];
    
    return(
        <section className="component-shipping">
            <p className="component-shipping__input-group component-shipping__input-group--type">
                <label className="component-shipping__input-description">
                    Legyen ez a számlázási cím is
                    <input
                        type="checkbox"
                        onChange={changeEvent => {
                            const transferValues = changeEvent.target.checked;
                            const newFormDataProperties = inputGroups.reduce(
                                (fields, group) => [...fields, ...group.inputs.map(input => input.name)], []
                            );
                            const newShippingData = newFormDataProperties.reduce(
                                (properties, property) => ({...properties, [property]: transferValues ? formData[property] : ""}), {}
                            );
                            setFormData({...formData, shipping: newShippingData});
                        }}
                        checked={Object.keys(formData.shipping).every(property => formData[property] === formData.shipping[property])}
                    />
                </label>
            </p>
            {
                inputGroups.map(inputGroup => 
                    <p key={inputGroup.id} className={`component-shipping__input-group component-shipping__input-group--${inputGroup.id}`}>
                        <span className="component-shipping__input-group-label">{inputGroup.label}</span>
                        {
                            inputGroup.inputs.map(input =>
                                <label key={input.name} className="component-shipping__input-description">
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        required
                                        onInput={inputEvent => {
                                            const newFormData = {...formData};
                                            newFormData.shipping[input.name] = inputEvent.target.value
                                            setFormData(newFormData);
                                        }}
                                        value={formData.shipping[input.name]}
                                    />
                                    {input.label}
                                </label>
                            )
                        }
                    </p>
                )
            }
        </section>
    );
}

export default Shipping;