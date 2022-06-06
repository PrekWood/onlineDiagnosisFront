import React ,{useState}from "react";
import "./BodyPartList.css";
import Validate from "../../../../Classes/Validate";
import ListItem from "../ListItem/ListItem";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";

export default function BodyPartList(props) {


    const [loadingState, setLoadingState] = useState(false);

    function selectBodyPart(idBodyPart){
        setLoadingState(true);
        const selectedBodyPartList = props.bodyParts.filter((bodyPart)=>bodyPart.id === idBodyPart);
        if(selectedBodyPartList.length !== 1){
            alert("something went wrong");
        }
        props.setSelectedBodyPart(selectedBodyPartList[0]);
        props.setSymptoms([]);
        selectedBodyPartList[0].loadSublocations(
            (bodyPart) => {
                props.setSubLocations(bodyPart.subLocations)
                setLoadingState(false);
            },
            () => {
                setLoadingState(false);
                alert("something went wrong")
            }
        )
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
                            isSelected={Validate.isEmpty(props.selectedBodyPart) ? false : bodyPart.id === props.selectedBodyPart.id}
                            setLoadingState={setLoadingState}
                        />
                    )
                })
            }
            <LoadingAnimation state={loadingState}/>
        </div>

    </>;
}