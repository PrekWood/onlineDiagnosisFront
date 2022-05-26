import React, {useEffect, useState} from 'react';
import './LoginForm.css';
import Validate from "../../../../Classes/Validate";
import User from "../../../../Classes/User";
import InputField from "../../../../SharedComponents/InputField/InputField";
import SubmitButton from "../../../../SharedComponents/SubmitButton/SubmitButton";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";


function LoginForm(props) {

    // Hiding and showing animation 
    const [loginFormState, setLoginFormState] = useState(true);
    const [loadingAnimationStatus, setLoadingAnimationStatus] = useState(false);
    const [errors, setErrors] = useState(null);


    useEffect(() => {
        if (props.isActive == null) {
            setLoginFormState("initial");
        } else if (props.isActive) {
            setLoginFormState("active");
        } else {
            setLoginFormState("hidden");
        }
    }, [props.isActive]);


    function submitLogin(event) {
        event.preventDefault();

        // Get form fields
        let email = null;
        let password = null;
        const formFields = event.target.elements;
        for (let formFieldIndex = 0; formFieldIndex < formFields.length; formFieldIndex++) {
            if (formFields[formFieldIndex].id === "login_email") {
                email = formFields[formFieldIndex].value
            }
            if (formFields[formFieldIndex].id === "login_password") {
                password = formFields[formFieldIndex].value
            }
        }

        // Validation
        if (
            !Validate.isEmail(email) ||
            !Validate.isNotEmpty(password) || !Validate.hasAtLeast8Chars(password) || !Validate.containsNumber(password)
        ) {
            setErrors("Invalid fields")
            return;
        }

        // Loading animantion
        setLoadingAnimationStatus(true);

        const user = new User();
        user.email = email;
        user.password = password;
        user.login(
            () => {
                setLoadingAnimationStatus(false);
                props.setUser(user);
                window.location.href="/symptoms";
            },
            (request) => {
                setLoadingAnimationStatus(false);
                if(Validate.isNotEmpty(request.response.data)){
                    setErrors(request.response.data.error);
                }else{
                    setErrors("Something went wrong. Please try again")
                }
            }
        );
    }

    return (
        <>
            <div className={`form login-form ${loginFormState}`}>
                <div className={"inner-form"}>
                    <h2>Login</h2>
                    <form onSubmit={submitLogin}>
                        <InputField
                            id="login_email"
                            name="E-mail"
                            validation={Validate.isEmail}/>
                        <InputField
                            id="login_password"
                            name="Password"
                            type="password"
                            validation={[Validate.isNotEmpty, Validate.hasAtLeast8Chars, Validate.containsNumber]}/>
                        <SubmitButton text="Log in"/>
                    </form>
                    <span className={`errors ${errors == null ? "hidden" : ""}`}>
                        {errors}
                    </span>
                    <a className="form-link" onClick={() => {
                        props.setCurrentForm("register")
                    }}>
                        Dont't have an account? Sign up here
                    </a>


                    <LoadingAnimation state={loadingAnimationStatus} />
                </div>
            </div>
        </>
    );
}

export default LoginForm;

