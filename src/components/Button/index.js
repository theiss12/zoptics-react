import "./style.scss";

function Button({value = "Click me!", onClick = () => {}}) {
    return (
        <button 
            className="component-button"
            data-value={value}
            onClick={onClick}
        >
        {value}
        </button>
    )
}

export default Button;