import React, {useEffect, useState} from "react";
import "./Diagnosis.css";
import Nav from "../../SharedComponents/Nav/Nav";
import Language from "../../Classes/Language";
import User from "../../Classes/User";
import Validate from "../../Classes/Validate";
import {ReactComponent as CheckSvg} from "./imgs/check.svg";
import DiagnosisDetails from "./Components/DiagnosisDetails/DiagnosisDetails";
import Symptom from "../../Classes/Symptom";

export default function Diagnosis() {

    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState(Language.getDefaultLang());

    useEffect(()=>{
        Language.saveUserToLocalStorage(language);
    },[language])
    useEffect(() => {
        // Load user
        const user = User.loadUserFromLocalStorage();
        // check if token is not expired
        user.getUserDetails(
            (response) => {
                const loggedInUser = User.castToUser(response.data)
                loggedInUser.token = user.token;
                setUser(loggedInUser)
            },
            (request) => {
                window.location.href = "/";
            }
        )
    }, []);

    const [diagnosis, setDiagnosis] = useState(null);
    useEffect(() => {
        if(Validate.isEmpty(user) || user.isEmpty() || !(user instanceof User)){
            return ;
        }

        user.getDiagnosis((diagnosis)=>{
            setDiagnosis(diagnosis.data);
            Symptom.emptySymptomsList(()=>{

            },()=>{
                alert("emptySymptomsList something went wrong")
            })
        },()=>{
            window.location.href="/symptoms"
        });

    }, [user]);

    return <>
        <div className={"Diagnosis"}>
            <main>
                <DiagnosisDetails
                    diagnosis={diagnosis}
                    language={language}
                />
            </main>
            <Nav
                language={language}
                setLanguage={setLanguage}
                user={user}
            />
        </div>
    </>;
}