import React from 'react';
import './SubmitButton.css';
import Validate from "../../Classes/Validate";
import TranslatedText from "../TranslatedText/TranslatedText";

function SubmitButton(props) {

    let onClickFunction = () => { };
        if ("callback" in props) {
        onClickFunction = props.callback;
    }

    return (
        <>
            <button
                type="submit"
                className="submit-button"
                onClick={onClickFunction}
            >
                {Validate.isEmpty(props.svg) ? "" : <img src={props.svg} />}
                <TranslatedText
                    text={props.text}
                    language={props.language}
                />
            </button>
        </>
    );
}

export default SubmitButton;