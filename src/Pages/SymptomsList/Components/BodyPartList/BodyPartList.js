import React from "react";
import "./BodyPartList.css";
import Validate from "../../../../Classes/Validate";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import ListItem from "../ListItem/ListItem";

export default function BodyPartList(props) {

    function selectBodyPart(idBodyPart){
        const selectedBodyPartList = props.bodyParts.filter((bodyPart)=>bodyPart.id === idBodyPart);
        if(selectedBodyPartList.length !== 1){
            alert("something went wrong");
        }
        props.setSelectedBodyPart(selectedBodyPartList[0]);
    }

    return <>

        <div className={"body-part-list level1"}>
            {Validate.isEmpty(props.bodyParts) ? "" :
                props.bodyParts.map((bodyPart) => {
                    return (
                        <ListItem
                            class={"body-part"}
                            key={`body_part_${bodyPart.id}`}
                            callBack={()=>{selectBodyPart(bodyPart.id)}}
                            text={bodyPart.name}
                            language={props.language}
                        />
                    )
                })
            }
        </div>

    </>;
}