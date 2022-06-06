import React, {useEffect, useState} from "react";
import "./BodySubLocationList.css";
import Validate from "../../../../Classes/Validate";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import ListItem from "../ListItem/ListItem";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";

export default function BodySubLocationList(props) {

    const [loadingState, setLoadingState] = useState(false);

    function selectSubLocation(subLocation){
        setLoadingState(true);
        props.setSelectedSublocation(subLocation);
        subLocation.getSymptoms(
            (symptoms) => {
                props.setSymptoms(symptoms)
                setLoadingState(false);
            },
            () => {
                alert("something went wrong")
            }
        )
    }

    return <>

        <div className={"body-sublocation-list"}>

            {Validate.isEmpty(props.subLocations) ? "" :
                props.subLocations.map((subLocation) => {
                    return (
                        <ListItem
                            class={"body-part"}
                            key={`body_part_${subLocation.id}`}
                            callBack={()=>{selectSubLocation(subLocation)}}
                            text={subLocation.name}
                            language={props.language}
                            isSelected={Validate.isEmpty(props.selectedSubLocation) ? false : subLocation.id === props.selectedSubLocation.id}
                        />
                    )
                })
            }
            <LoadingAnimation state={loadingState}/>
        </div>

    </>;
}