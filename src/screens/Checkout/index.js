import "./style.scss";
import CartContent from "./components/CartContent";
import Accounting from "./components/Accounting";
import Shipping from "./components/Shipping";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";

function Checkout() {

    useEffect(() => {
        window.scroll(0,0);
    }, []);

    const STEP_TYPES = {
        cart: "cart",
        accounting: "accounting",
        shipping: "shipping",
        summary: "summary"
    }

    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(STEP_TYPES.cart);
    const [previousEnabled, setPreviousEnabled] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(true);

    const checkoutSteps = [
        {
            id: STEP_TYPES.cart, 
            label: "Kosár áttekintése",
            component: <CartContent />
        },
        {
            id: STEP_TYPES.accounting, 
            label: "Számlázás",
            component: <Accounting formData={formData} setFormData={setFormData} />
        },
        {
            id: STEP_TYPES.shipping, 
            label: "Szállítás",
            component: <Shipping formData={formData} setFormData={setFormData} />
        },
        {
            id: STEP_TYPES.summary, 
            label: "Összegzés",
            component: <Summary formData={formData} setFormData={setFormData} />
        }
    ];

    const toggleEnabled = (change, typeNames, newIndex) => {
        setPreviousEnabled(true);
        setNextEnabled(true);
        const isPrevious = change < 0;
        if (isPrevious) {
            if (typeNames[newIndex - 1] === undefined) {
                setPreviousEnabled(false);
            } else {
                setPreviousEnabled(true);
            }
        } else {
            if (typeNames[newIndex + 1] === undefined) {
                setNextEnabled(false);
            } else {
                setNextEnabled(true);
            }
        }
    }

    const navigateSteps = (change) => {
        const typeNames = Object.keys(STEP_TYPES);
        const currentIndex = typeNames.indexOf(currentStep);
        const newIndex = currentIndex + change;
        const newStep = typeNames[newIndex];

        toggleEnabled(change, typeNames, newIndex);

        window.scroll(0,0);

        setCurrentStep(newStep);
    };

    return(
        <section className="screen-checkout">
            <div className="step-indicators" style={{backgroundImage: "url(/img/indicator-background-7.jpg)"}}>
                <div className="container">
                    <ul className="step-indicators__steps">
                        {
                            checkoutSteps.map((checkoutStep, stepIndex) => 
                                <li key={checkoutStep.id} className="step-indicator">
                                    <div className={`step-indicator__circle ${checkoutStep.id === currentStep ? "step-indicator__circle--active" : ""}`}>
                                        {stepIndex + 1}
                                    </div>
                                    <h3 className="step-indicator__label">
                                        {checkoutStep.label}
                                    </h3>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="checkout-current-step">
                    {checkoutSteps.find(step => step.id === currentStep).component || <p>NOPE</p>}
                </div>
            </div>

            <div className="screen-checkout__navigation-buttons">
                <button 
                    className="screen-checkout__navigation-button"
                    onClick={() => {
                        navigateSteps(-1);
                    }}
                    disabled={!previousEnabled}
                >
                    Előző
                </button>
                <button 
                    className="screen-checkout__navigation-button"
                    onClick={() => {
                        navigateSteps(1);
                    }}
                    disabled={!nextEnabled}
                >
                    Következő
                </button>
            </div>
        </section>
    );
}

export default Checkout;