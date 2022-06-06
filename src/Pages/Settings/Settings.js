import React, {useEffect, useState} from "react";
import "./Settings.css";
import Nav from "../../SharedComponents/Nav/Nav";
import Language from "../../Classes/Language";
import User from "../../Classes/User";
import InputField from "../../SharedComponents/InputField/InputField";
import Validate from "../../Classes/Validate";
import Select from "../../SharedComponents/Select/Select";
import SubmitButton from "../../SharedComponents/SubmitButton/SubmitButton";
import TranslatedText from "../../SharedComponents/TranslatedText/TranslatedText";

export default function Settings() {

    const [user, setUser] = useState(new User());
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

    const [errors, setErrors] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const GENDER_OPTIONS = [
        {
            id:0,
            name:"Gender",
            value:"",
            placeholder:true
        },
        {
            id:1,
            name:"Male",
            value:"male",
        },
        {
            id:2,
            name:"Female",
            value:"female",
        }
    ]

    useEffect(()=>{
        document.querySelector(".success").classList.add("open");
        setTimeout(()=>{
            document.querySelector(".success").classList.remove("open");
        },2000);
    },[successMsg])

    function updateUser(event){
        event.preventDefault();

        // Get form fields
        let lastName = null;
        let firstName = null;
        let email = null;
        let year = null;
        let gender = null;
        const formFields = event.target.elements;
        for (let formFieldIndex = 0; formFieldIndex < formFields.length; formFieldIndex++) {
            if (formFields[formFieldIndex].id === "update_first_name") {
                firstName = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "update_last_name") {
                lastName = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "update_email") {
                email = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "update_year") {
                year = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "update_gender") {
                gender = formFields[formFieldIndex].value
            }
        }

        // Validate fields
        if (!(
            Validate.isNotEmpty(firstName) && Validate.containsOnlyLetters(firstName) &&
            Validate.isNotEmpty(lastName) && Validate.containsOnlyLetters(lastName) &&
            Validate.isEmail(email) &&
            Validate.containsOnlyNumbers(year) && Validate.has4Characters(year) &&
            (gender === "male" || gender === "female")
        )) {
            setErrors("Invalid fields")
            setSuccessMsg(null);
            return;
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.year = year;
        user.gender = gender;
        user.update(()=>{
            setErrors(null);
            setSuccessMsg("Update was successful");
        },()=>{

        });
    }

    function getGenderOptions(){
        const genderOptions = [];
        GENDER_OPTIONS.map((option)=>{
            genderOptions.push({
                "id":option.id,
                "name":option.name,
                "value":option.value,
                "placeholder":option.placeholder,
                "selected":option.value === user.gender
            })
        });
        return genderOptions;
    }
    return <>
        <div className={"Settings"}>
            <main>
                <div className={"settings-container"}>
                    <h1>
                        <TranslatedText
                            text={"Settings"}
                            language={language}
                        />
                    </h1>
                    <form onSubmit={updateUser}>
                        <InputField
                            id="update_first_name"
                            name="First Name"
                            variation="half"
                            defaultValue={user.firstName}
                            validation={[Validate.isNotEmpty, Validate.containsOnlyLetters]}
                            language={language}
                        />
                        <InputField
                            id="update_last_name"
                            name="Last Name"
                            variation="half"
                            defaultValue={user.lastName}
                            validation={[Validate.isNotEmpty, Validate.containsOnlyLetters]}
                            language={language}
                        />
                        <InputField
                            id="update_year"
                            name="Year of birth"
                            max="4"
                            defaultValue={user.year}
                            validation={[Validate.containsOnlyNumbers, Validate.has4Characters]}
                            language={language}
                        />
                        <div id={"update_gender_selector_container"}>
                            <Select
                                id="update_gender"
                                name="Gender"
                                options={getGenderOptions()}
                                callBack={()=>{
                                    document.getElementById("update_gender_selector_container").classList
                                        .add('valid');
                                }}
                                language={language}
                            />
                        </div>
                        <InputField
                            id="update_email"
                            name="E-mail"
                            defaultValue={user.email}
                            validation={Validate.isEmail}
                            language={language}
                        />
                        <SubmitButton
                            text="Sign up"
                            language={language}
                        />
                        <span className={`errors ${errors == null ? "hidden" : ""}`}>
                            <TranslatedText
                                text={errors}
                                language={language}
                            />
                        </span>
                        <span className={`success ${successMsg == null ? "hidden" : ""}`}>
                            <TranslatedText
                                text={successMsg}
                                language={language}
                            />
                        </span>
                    </form>
                </div>
            </main>

            <Nav
                language={language}
                setLanguage={setLanguage}
                user={user}
            />
        </div>
    </>;
}