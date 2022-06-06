import Validate from "../../../../Classes/Validate";
import React from "react";
import TranslatedText from "../../../TranslatedText/TranslatedText";

export default function Option(props){
    return <>
        {"placeholder" in props.option && props.option.placeholder?"":
            (
                <div className="option"
                     onClick={() => { props.selectOption(props.option); }}
                >
                    <img src={Validate.isEmpty(props.option.svg) ? "" : props.option.svg} />
                    <span>
                        <TranslatedText
                            text={props.option.name}
                            language={props.language}
                        />
                    </span>
                </div>
            )
        }
    </>
}