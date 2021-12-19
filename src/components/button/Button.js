import React from 'react';
import {
    useHistory
} from "react-router-dom";
import BackArrow from "../../assets/back.svg";
import "./Button.css"

function Button() {

    const history = useHistory();

    return (
        <button onClick={history.goBack} className="backnav"><img src={BackArrow} className="backnav" alt="back button"/> Back</button>
    );
}

export default Button;