import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

function Button(props) {
        const { className, name, onClick } = props;
        return (
            <button
                type="button"
                className={`btn ${className}`}
                onClick={onClick}
            >
                {name}
            </button>
        )
}

export default Button;