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
import BodyPartSymptomsList from "./Components/BodyPartSymptomsList/BodyPartSymptomsList";
import UserSymptomsList from "./Components/UserSymptomsList/UserSymptomsList";
import Symptom from "../../Classes/Symptom"

export default function SymptomsList() {

    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState(Language.getDefaultLang());
    const [bodyParts, setBodyParts] = useState(null);

    useEffect(()=>{
        Language.saveUserToLocalStorage(language);
    },[language])
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


    // Sublocations
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const [subLocations, setSubLocations] = useState(null);

    // Symptoms
    const [selectedSubLocation, setSelectedSublocation] = useState(null);
    const [symptoms, setSymptoms] = useState([]);


    // Symptoms list
    const [symptomsList, setSymptomsList] = useState(null);
    useEffect(()=>{
        reloadSymptomsList((symptoms)=>{
            setSymptomsList(symptoms);
        })
    },[]);
    function reloadSymptomsList(successMethod){
        Symptom.loadSymptomsList(
            (symptoms) => {
                successMethod(symptoms)
            },
            () => {
                alert("something went wrong")
            }
        )
    }

    return (
        <>
            <div className={"SymptomsList"}>

                <main>
                    <div className={"body-locations"}>
                        <div className={"symptoms-header"}>
                            <h2>
                                <TranslatedText
                                    text={"Are you not feeling good?"}
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

                        <UserSymptomsList
                            symptomsList={symptomsList}
                            setSymptomsList={setSymptomsList}
                            reloadSymptomsList={reloadSymptomsList}
                            language={language}
                        />

                        <div className={"symptoms-selector"}>

                            <BodyPartList
                                bodyParts={bodyParts}
                                language={language}
                                setSelectedBodyPart={setSelectedBodyPart}
                                selectedBodyPart ={selectedBodyPart}
                                setSymptoms={setSymptoms}
                                setSubLocations={setSubLocations}
                            />

                            <BodySubLocationList
                                subLocations={subLocations == null ? [] : subLocations}
                                language={language}
                                setSelectedSublocation={setSelectedSublocation}
                                selectedSubLocation={selectedSubLocation}
                                setSymptoms={setSymptoms}
                            />

                            <BodyPartSymptomsList
                                symptoms={symptoms == null ? [] : symptoms}
                                language={language}
                                reloadSymptomsList={reloadSymptomsList}
                                setSymptomsList={setSymptomsList}
                                symptomsList={symptomsList}
                            />

                        </div>
                    </div>
                </main>
                <Nav
                    language={language}
                    setLanguage={setLanguage}
                    user={user}
                />
            </div>
        </>
    );
}