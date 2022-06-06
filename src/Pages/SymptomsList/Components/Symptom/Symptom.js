import React from "react";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import "./Symptom.css"
import {ReactComponent as AddSvg} from "./imgs/add.svg";
import {ReactComponent as AddedSvg} from "./imgs/added.svg";

export default function Symptom(props) {

    function addSymptom(){

    }
    function removeSymptom(){

    }

    return (
        <>
            <div
                className={`${props.class} ${props.selected?"selected":""}`}
                onClick={props.callBack}
            >
                <span>
                    <TranslatedText
                        text={props.text}
                        language={props.language}
                    />
                </span>

                {props.selected ? (
                    <button className={"add-symptom"}>
                        <AddedSvg/>
                    </button>
                ):(
                    <button className={"add-symptom"}>
                        <AddSvg/>
                    </button>
                )}
            </div>
        </>
    );
}