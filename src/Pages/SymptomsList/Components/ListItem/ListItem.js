import React from "react";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import {ReactComponent as ArrowSvg} from "./imgs/arrow.svg";
import {ReactComponent as ArrowPurpleSvg} from "./imgs/arrow_purple.svg";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";

export default function ListItem(props) {

    return (
        <>
            <div
                className={`${props.class}${props.isSelected?" selected":""}`}
                onClick={()=>{
                    props.callBack(props.setLoadingState)
                }}
            >
                <span>
                    <TranslatedText
                        text={props.text}
                        language={props.language}
                    />
                </span>
                <div className={"active-arrow arrow-container"}>
                    <ArrowSvg/>
                </div>
                <div className={"inactive-arrow arrow-container"}>
                    <ArrowPurpleSvg/>
                </div>
            </div>
        </>
    );
}