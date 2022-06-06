import React, {useEffect, useState} from "react";
import "./TranslatedText.css"
import Validate from "../../Classes/Validate";
import Language from "../../Classes/Language";

export default function TranslatedText(props) {

    const [translatedText, setTranslatedText] = useState(null);

    useEffect(()=>{
        if(Validate.isNotEmpty(props.language) && !props.language.isEmpty()){
            setTranslatedText(null);
            props.language.translate(
                props.text,
                (response)=>{
                    setTranslatedText(response);
                },
                ()=>{

                }
            );
        }
    },[props.language, props.text])

    if (!("text" in props) || !("language" in props)) {
        return <b>
            TranslatedText needs text and lang
        </b>
    }


    return <>
        {translatedText !== null ? translatedText : (
            <div className={"loading-translated-text"}></div>
        )}
    </>;
}