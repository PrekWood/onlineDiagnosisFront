import React, { useEffect, useState } from 'react';
import './PhoneNumberForm.css';
import Validate from "../../../../Classes/Validate";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";
import SubmitButton from "../../../../SharedComponents/SubmitButton/SubmitButton";
import InputField from "../../../../SharedComponents/InputField/InputField";

function PhoneNumberForm(props) {

    const [phoneNumberFormState, setPhoneNumberFormState] = useState("false");
    const [showLoadingAnimation, setLoadingAnimation] = useState(false);
    const [errors, serErrors] = useState("");

    useEffect(() => {
        if (props.isActive == null) {
            setPhoneNumberFormState("initial");
        } else if (props.isActive) {
            setPhoneNumberFormState("active");
        } else {
            setPhoneNumberFormState("hidden");
        }

    }, [props.isActive]);

    function sendSms(e) {
        e.preventDefault();

        if (props.user == null) {
            serErrors("Not loged in");
            return;
        }

        let phoneNumber = null;
        const formFields = e.target.elements;
        for (let formFieldIndex = 0; formFieldIndex < formFields.length; formFieldIndex++) {
            if (formFields[formFieldIndex].id === "otp_phone_number") {
                phoneNumber = formFields[formFieldIndex].value
            }
        }

        setLoadingAnimation(true);

        props.user.phoneNumber = phoneNumber;
        props.user.savePhoneNumberAndSendSms(
            ()=> {
                setLoadingAnimation(false);
                props.setCurrentForm("otp-validation");
                props.setUser(props.user);
            }
            ,
            (response) => {
                setLoadingAnimation(false);
                if(Validate.isNotEmpty(response.response.data)){
                    serErrors(response.response.data.error);
                }else{
                    serErrors("Something went wrong please try again.");
                }
            }
        );
    }

    return (
        <>
            <div className={`form phone-number-form ${phoneNumberFormState}`}>
                <div className={"inner-form"}>
                    <h2>Phone Number</h2>
                    <span className={"text"}>In order to complete your account we need to verify your telephone.</span>
                    <form onSubmit={sendSms}>
                        <div className="phone-number-container">
                            <InputField
                                id="otp_phone_number"
                                name="Phone Number"
                                validation={[Validate.isNotEmpty, Validate.containsOnlyNumbers, Validate.has10Characters]}
                            />
                        </div>
                        <SubmitButton text="Send SMS" />
                    </form>
                    <span className={`errors ${errors == "" ? "hidden" : ""}`}>{errors}</span>
                    <LoadingAnimation state={showLoadingAnimation} />
                    <a className="form-link" onClick={()=>{
                        props.setCurrentForm("login")
                    }}>
                        Already have an account? Log in here
                    </a>
                </div>
            </div>
        </>
    );
}

export default PhoneNumberForm;

