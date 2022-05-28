import React from "react";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";

export default function ListItem(props) {

    return (
        <>
            <div
                className={props.class}
                onClick={props.callBack}
            >
                <span>
                    <TranslatedText
                        text={props.text}
                        language={props.language}
                    />
                </span>
            </div>
        </>
    );
}