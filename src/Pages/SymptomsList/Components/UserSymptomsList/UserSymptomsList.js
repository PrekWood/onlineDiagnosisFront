import React from "react";
import "./UserSymptomsList.css"
import Validate from "../../../../Classes/Validate";
import checkerBoardImg from "./imgs/checkerboard.png";
import {ReactComponent as RemoveSvg} from "./imgs/remove.svg";
import SubmitButton from "../../../../SharedComponents/SubmitButton/SubmitButton";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";

export default function UserSymptomsList(props) {

    function removeSymptom(symptom){
        symptom.removeFromList(()=>{
            props.reloadSymptomsList((s)=>{
                props.setSymptomsList(s);
            })
        },()=>{
            alert("something went wrong")
        });
    }

    return (
        <>
            <div className={`user-symptoms-list ${Validate.isArrayEmpty(props.symptomsList)?"empty":""}`}>
                <img src={checkerBoardImg}/>
                {Validate.isArrayEmpty(props.symptomsList) ? "" :
                    <div className={"symptoms-count"}>
                        {props.symptomsList.length}
                    </div>
                }

                <div className={`user-symptoms-list-items ${Validate.isEmpty(props.symptomsList)?"empty":""}`}>
                    {Validate.isEmpty(props.symptomsList) ? "" : props.symptomsList.map((symptom) => {
                        return (
                            <div className={"user-symptom"} key={`symptom-${symptom.id}`}>
                                <TranslatedText
                                    language={props.language}
                                    text={symptom.name}
                                />

                                <button
                                    className={"remove-symptom"}
                                    onClick={()=>{removeSymptom(symptom)}}
                                >
                                    <RemoveSvg/>
                                </button>
                            </div>
                        )
                    })}
                    {Validate.isArrayEmpty(props.symptomsList) ? "" :
                        <button
                            id={"proceed_to_diagnosis"}
                            onClick={()=>{
                                window.location.href="/diagnosis"
                            }}
                        >
                            <TranslatedText
                                text={"Proceed to diagnosis"}
                                language={props.language}
                            />
                        </button>
                    }
                </div>


            </div>
        </>

    )
}

