import React, {useEffect, useState} from 'react';
import './RegisterForm.css';
import Validate from './../../../../Classes/Validate';
import User from './../../../../Classes/User';
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";
import SubmitButton from "../../../../SharedComponents/SubmitButton/SubmitButton";
import InputField from "../../../../SharedComponents/InputField/InputField";
import reportWebVitals from "../../../../reportWebVitals";
import Select from "../../../../SharedComponents/Select/Select";

function RegisterForm(props) {

    const [registerFormState, setRegisterFormState] = useState("active");
    const [showLoadingAnimation, setLoadingAnimation] = useState(false);
    const [errors, setErrors] = useState(null);
    
    // Hiding and showing component animation 
    useEffect(() => {
        if (props.isActive == null) {
            setRegisterFormState("initial");
        } else if (props.isActive) {
            setRegisterFormState("active");
        } else {
            setRegisterFormState("hidden");
        }
    }, [props.isActive]);


    function register(event) {
        event.preventDefault();

        // Get form fields
        let lastName = null;
        let firstName = null;
        let email = null;
        let password = null;
        let year = null;
        let gender = null;
        const formFields = event.target.elements;
        for (let formFieldIndex = 0; formFieldIndex < formFields.length; formFieldIndex++) {
            if (formFields[formFieldIndex].id === "register_first_name") {
                firstName = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "register_last_name") {
                lastName = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "register_email") {
                email = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "register_password") {
                password = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "register_year") {
                year = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "register_gender") {
                gender = formFields[formFieldIndex].value
            }
        }

        // Validate fields
        if (!(
            Validate.isNotEmpty(firstName) && Validate.containsOnlyLetters(firstName) &&
            Validate.isNotEmpty(lastName) && Validate.containsOnlyLetters(lastName) &&
            Validate.isEmail(email) &&
            Validate.containsNumber(password) && Validate.hasAtLeast8Chars(password) && Validate.isNotEmpty(password)
        )) {
            setErrors("Invalid fields")
            return;
        }

        setLoadingAnimation(true);

        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.gender = gender;
        user.year = year;

        user.register(
            (response) => {
                setLoadingAnimation(false);

                user.token = response.data.token;
                user.id = response.registerResponse.data.id;

                props.setUser(user)
                props.setCurrentForm("phone-number")
            },
            (request) => {
                setLoadingAnimation(false);
                if(Validate.isNotEmpty(request.response.data)){
                    setErrors(request.response.data.error);
                }else{
                    setErrors("Something went wrong please try again.");
                }
            }
        );
    }

    const GENDER_OPTIONS = [
        {
            id:0,
            name:"Gender",
            value:"",
            placeholder:true
        },
        {
            id:1,
            name:"Girl",
            value:"girl",
        },
        {
            id:2,
            name:"Boy",
            value:"boy",
        },
        {
            id:3,
            name:"Man",
            value:"man",
        },
        {
            id:4,
            name:"Woman",
            value:"woman",
        }
    ]

    return (
        <>
            <div className={`form register-form ${registerFormState}`}>
                <div className={"inner-form"}>
                    <h2>Sign up</h2>
                    <form onSubmit={register}>
                        <InputField
                            id="register_first_name"
                            name="First Name"
                            variation="half"
                            validation={[Validate.isNotEmpty, Validate.containsOnlyLetters]}
                        />
                        <InputField
                            id="register_last_name"
                            name="Last Name"
                            variation="half"
                            validation={[Validate.isNotEmpty, Validate.containsOnlyLetters]}
                        />
                        <InputField
                            id="register_year"
                            name="Year of birth"
                            max="4"
                            validation={[Validate.containsOnlyNumbers, Validate.has4Characters]}
                        />
                        <div id={"register_gender_selector_container"}>
                            <Select
                                id="register_gender"
                                name="Gender"
                                options={GENDER_OPTIONS}
                                callBack={()=>{
                                    document.getElementById("register_gender_selector_container").classList
                                        .add('valid');
                                }}
                            />
                        </div>
                        <InputField
                            id="register_email"
                            name="E-mail"
                            validation={Validate.isEmail}
                        />
                        <InputField
                            id="register_password"
                            name="Password"
                            type="password"
                            validation={[Validate.isNotEmpty, Validate.hasAtLeast8Chars, Validate.containsNumber]}
                        />
                        <SubmitButton text="Sign up"/>
                        <span className={`errors ${errors == null ? "hidden" : ""}`}>
                            {errors}
                        </span>
                        <a className="form-link" onClick={() => {
                            props.setCurrentForm("login");
                        }}>
                            Already have an account? Log in here
                        </a>
                    </form>

                    <LoadingAnimation state={showLoadingAnimation}/>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;

