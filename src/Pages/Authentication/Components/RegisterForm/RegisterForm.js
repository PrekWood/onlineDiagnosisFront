import React, {useEffect, useState} from 'react';
import './RegisterForm.css';
import Validate from './../../../../Classes/Validate';
import User from './../../../../Classes/User';
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";
import SubmitButton from "../../../../SharedComponents/SubmitButton/SubmitButton";
import InputField from "../../../../SharedComponents/InputField/InputField";

function RegisterForm(props) {

    const [registerFormState, setRegisterFormState] = useState("active");
    const [showLoadingAnimation, setLoadingAnimation] = useState(false);
    const [registerFormErrors, setRegisterFormErrors] = useState(null);
    const [formData, setFormData] = useState({
        "register_first_name": null,
        "register_last_name": null,
        "register_email": null,
        "register_password": null
    });

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


    // useEffect(() => {
    //     // Make the form appear
    //     const registerForm = document.querySelector(".register-form");
    //     const registerFormHeight = registerForm.clientHeight;
    //     registerForm.style.top = `calc(50vh - ${registerFormHeight / 2}px)`;
    //
    //     // set CSS variable for the animation
    //     const cssScript = `<style>:root{--registerFormTop: ${registerFormHeight / 2}px}</style>`;
    //     document.querySelector(".extra-css").innerHTML += cssScript;
    // }, []);
    //
    //
    // // Change data on update fields
    // function changeRegisterFormData(event, state) {
    //     const changedField = event.target.id;
    //     const changedValue = event.target.value;
    //     if (!(changedField in formData)) {
    //         console.log(`Register Error: ${changedField} not in formData`);
    //     }
    //
    //     let formDataChanged = formData;
    //     formDataChanged[changedField] = {
    //         "value": changedValue,
    //         "isValid": state.isValid
    //     }
    //     setFormData(formDataChanged);
    // }
    //
    // // Form validation

    //
    // // Form submit

    //
    // function stopLoadingAnimation() {
    //     setLoadingAnimation(false);
    // }
    // function registerSuccess(response) {
    //
    //     // Save user to localstorage
    //     let newUser = new User();
    //     newUser.email = response.registerResponse.data.email;
    //     newUser.firstName = response.registerResponse.data.firstName;
    //     newUser.idUser = response.registerResponse.data.id;
    //     newUser.lastName = response.registerResponse.data.lastName;
    //     newUser.token = response.data.token;
    //     newUser.saveUserToLocalStorage();
    //
    //     stopLoadingAnimation();
    //     props.switchToPhoneNumberForm();
    // }
    //
    // function registerErrorHandling(error) {
    //     stopLoadingAnimation();
    //     if (error.response.status == 409) {
    //         setRegisterFormErrors("The E-mail is already being used. Please use some other e-mail.");
    //     } else {
    //         console.log(error);
    //         setRegisterFormErrors("Something went wrong please try again");
    //     }
    // }
    //
    // function switchToLogin(){
    //     props.switchToLogin(true);
    // }

    function signUp(e) {
        e.preventDefault();
        // if (!validateFields()) {
        //     setRegisterFormErrors("Please fill in all the fields")
        //     return;
        // }

        setLoadingAnimation(true);

        let user = new User();
        user.firstName = "asdf";
        user.lastName = "Asdfasd";
        user.email = "asdfa@asfdasd.fasdfa";
        user.password = "asdfasdfasfas1234";
        user.register(() => {

        }, () => {

        });
    }

    function validateFields() {
        const fields = Object.keys(formData);

        let areFieldsValid = true;
        fields.forEach((field, index) => {
            if (formData[field] == null || !formData[field].isValid) {
                areFieldsValid = false;
            }
        });

        return areFieldsValid;
    }

    return (
        <>
            <div className={`form register-form ${registerFormState}`}>
                <div className={"inner-form"}>
                    <h2>Sign up</h2>
                    <form onSubmit={signUp}>
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
                        <span
                            className={`errors ${registerFormErrors == null ? "hidden" : ""}`}>{registerFormErrors}</span>
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

