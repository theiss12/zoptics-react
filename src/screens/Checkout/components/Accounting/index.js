import "./style.scss";
import { useEffect, useState } from "react";

function Accounting({ formData = {}, setFormData = () => { } }) {

    const [isCompany, setIsCompany] = useState(formData.company);

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

    return (
        <section className="component-accounting">
            <p className="component-accounting__input-group component-accounting__input-group--type">
                {/* <span className="component-accounting__input-group-label">Megrendelő típusa</span> */}
                <label className="component-accounting__input-description">
                    <input
                        type="radio"
                        name="customer-type"
                        value={"person"}
                        onChange={() => {
                            setIsCompany(false);
                            setFormData({ ...formData, company: false });
                        }}
                        checked={!isCompany}
                        required
                    />
                    Magánszemély
                </label>
                <label className="component-accounting__input-description">
                    <input
                        type="radio"
                        name="customer-type"
                        value={"company"}
                        onChange={() => {
                            setIsCompany(true);
                            setFormData({ ...formData, company: true });
                        }}
                        checked={isCompany}
                        required
                    />
                    Cég
                </label>
            </p>
            {
                inputGroups.map(inputGroup => 
                    <p key={inputGroup.id} className={`component-accounting__input-group component-accounting__input-group--${inputGroup.id}`}>
                        <span className="component-accounting__input-group-label">{inputGroup.label}</span>
                        {
                            inputGroup.inputs.map(input =>
                                <label key={input.name} className="component-accounting__input-description">
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        required
                                        onInput={inputEvent => {
                                            const newFormData = {...formData};
                                            newFormData[input.name] = inputEvent.target.value
                                            setFormData(newFormData);
                                        }}
                                        value={formData[input.name]}
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

export default Accounting;