import "./style.scss";
import { useState } from "react";

function Accounting({formData = {}, setFormData = () => {}}) {
    
    const [isCompany, setIsCompany] = useState(false);

    return(
        <section className="component-accounting">
            <p className="component-accounting__input-group">
                <span className="component-accounting__input-group-label">Megrendelő típus:</span>
                <label>
                    <input
                        type="radio" 
                        name="customer-type" 
                        value={"person"} 
                        onChange={() => {setIsCompany(false)}}
                        checked={!isCompany}
                        required
                    />
                    Magánszemély
                </label>
                <label>
                    <input
                        type="radio" 
                        name="customer-type" 
                        value={"company"} 
                        onChange={() => {setIsCompany(true)}}
                        checked={isCompany}
                        required
                    />
                    Cég
                </label>
            </p>

            <p className="component-accounting__input-group">
                <label>
                    <input type="text" name="last-name" required/>
                    {isCompany ? "Cégnév" : "Vezetéknév"}
                </label>
                <label>
                    <input type="text" name="first-name" required/>
                    {isCompany ? "Adószám" : "Keresztnév"}
                </label>
            </p>

            <p className="component-accounting__input-group">
                <label>
                    <input type="tel" name="telephone"/>
                    Telefonszám
                </label>
                <label>
                    <input type="email" name="email" required/>
                    E-Mail
                </label>
            </p>
            <p className="component-accounting__input-group">
                <label>
                    <input type="text" name="zip-code" required/>
                    Irányítószám
                </label>
                <label>
                    <input type="text" name="settlement" required/>
                    Település
                </label>
                <label>
                    <input type="text" name="street" required/>
                    Utca
                </label>
                <label>
                    <input type="text" name="house-number" required/>
                    Házszám
                </label>
            </p>
        </section>
    );
}

export default Accounting;