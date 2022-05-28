import React, {useEffect, useState} from "react";
import User from "../../Classes/User";
import BodyPart from "../../Classes/BodyPart";
import Nav from "../../SharedComponents/Nav/Nav";
import "./SymptomsList.css"
import Language from "../../Classes/Language";
import BodyPartList from "./Components/BodyPartList/BodyPartList";
import TranslatedText from "../../SharedComponents/TranslatedText/TranslatedText";
import Validate from "../../Classes/Validate";
import BodySubLocationList from "./Components/BodySubLocationList/BodySubLocationList";

export default function SymptomsList() {

    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState(Language.getDefaultLang());
    const [bodyParts, setBodyParts] = useState(null);
    useEffect(() => {
        // Load user
        const user = User.loadUserFromLocalStorage();
        // check if token is not expired
        user.getUserDetails(
            (response) => {
                setUser(User.castToUser(response))
            },
            (request) => {
                window.location.href = "/";
            }
        )

        // Load body parts
        BodyPart.loadBodyPartList(
            (bodyPartList) => {
                setBodyParts(bodyPartList);
            },
            () => {
                alert("something went wrong")
            }
        )

    }, []);


    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const [subLocations, setSubLocations] = useState(null);
    useEffect(()=>{

        if(Validate.isEmpty(selectedBodyPart)){
            return;
        }

        selectedBodyPart.loadSublocations(
            (bodyPart) => {
                setSubLocations(bodyPart.subLocations)
            },
            () => {
                alert("something went wrong")
            }
        )
    },[selectedBodyPart]);

    return (
        <>
            <div className={"SymptomsList"}>

                <Nav
                    language={language}
                    setLanguage={setLanguage}
                    user={user}
                />

                <main>
                    <div className={"body-locations"}>
                        <div className={"symptoms-header"}>
                            <h2>
                                <TranslatedText
                                    text={"Not feeling Good?"}
                                    language={language}
                                />
                            </h2>
                            <span>
                                <TranslatedText
                                    text={"Where are you in pain?"}
                                    language={language}
                                />
                            </span>
                        </div>

                        <div className={"symptoms-selector"}>
                            <BodyPartList
                                bodyParts={bodyParts}
                                language={language}
                                setSelectedBodyPart={setSelectedBodyPart}
                            />

                            <BodySubLocationList
                                subLocations={subLocations == null ? [] : subLocations}
                                language={language}
                                setSelectedBodyPart={setSelectedBodyPart}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}