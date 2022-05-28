import React, {useEffect} from "react";
import "./BodySubLocationList.css";
import Validate from "../../../../Classes/Validate";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import ListItem from "../ListItem/ListItem";

export default function BodySubLocationList(props) {

    function selectBodyPart(idBodyPart){
        // const selectedBodyPartList = props.bodyParts.filter((bodyPart)=>bodyPart.id === idBodyPart);
        // if(selectedBodyPartList.length !== 1){
        //     alert("something went wrong");
        // }
        // props.setSelectedBodyPart(selectedBodyPartList[0]);
    }

    return <>

        <div className={"body-sublocation-list"}>

            {Validate.isEmpty(props.subLocations) ? "" :
                props.subLocations.map((subLocation) => {
                    return (
                        <ListItem
                            class={"body-part"}
                            key={`body_part_${subLocation.id}`}
                            callBack={()=>{selectBodyPart(subLocation.id)}}
                            text={subLocation.name}
                            language={props.language}
                        />
                    )
                })
            }
        </div>

    </>;
}