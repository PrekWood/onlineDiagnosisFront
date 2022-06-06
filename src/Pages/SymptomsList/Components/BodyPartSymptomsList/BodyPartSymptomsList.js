import React, {useEffect} from "react";
import "./BodyPartSymptomsList.css";
import Validate from "../../../../Classes/Validate";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import ListItem from "../ListItem/ListItem";
import Symptom from "../Symptom/Symptom";

export default function BodyPartSymptomsList(props) {

    function addSymptomToList(symptom){
        symptom.addToList(()=>{
            props.reloadSymptomsList((symptoms)=>{
                props.setSymptomsList(symptoms)
            });
        },(request)=>{
            if(request.response.status === 409){
                alert("Symptom already added");
            }else{
                alert("Something went wrong please try again");
            }
        });
    }

    function removeFromSymptomsList(symptom){
        symptom.removeFromList(()=>{
            props.reloadSymptomsList((symptoms)=>{
                props.setSymptomsList(symptoms)
            });
        },(request)=>{
            if(request.response.status === 409){
                alert("Symptom already added");
            }else{
                alert("Something went wrong please try again");
            }
        });
    }

    function inSymptomsList(symptom){
        const searchResults = props.symptomsList.filter((s)=>s.id === symptom.id);
        if(searchResults.length === 1){
            return true;
        }
        return false;
    }

    return <>
        <div className={"symptoms-list"}>
            {Validate.isEmpty(props.symptoms) ? "" :
                props.symptoms.map((symptom) => {
                    return (
                        <Symptom
                            class={`symptom`}
                            key={`body_part_${symptom.id}`}
                            callBack={()=>{
                                if(inSymptomsList(symptom)){
                                    removeFromSymptomsList(symptom);
                                }else{
                                    addSymptomToList(symptom)
                                }
                            }}
                            text={symptom.name}
                            language={props.language}
                            selected={inSymptomsList(symptom)}
                        />
                    )
                })
            }
        </div>
    </>;
}