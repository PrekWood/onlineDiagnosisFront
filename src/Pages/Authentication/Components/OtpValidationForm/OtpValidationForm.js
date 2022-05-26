import React, {useEffect, useState} from 'react';
import './OtpValidationForm.css';
import Validate from "../../../../Classes/Validate";
import SubmitButton from "../../../../SharedComponents/SubmitButton/SubmitButton";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";
import InputField from "../../../../SharedComponents/InputField/InputField";


function OtpValidationForm(props) {

    const [otpValidationFormState, setOtpValidationFormState] = useState("initial");
    const [showLoadingAnimation, setLoadingAnimation] = useState(false);
    const [errors, setErrors] = useState("");

    // Hiding and showing component animation
    useEffect(() => {
        if (props.isActive == null) {
            setOtpValidationFormState("initial");
        } else if (props.isActive) {
            setOtpValidationFormState("active");
        } else {
            setOtpValidationFormState("hidden");
        }
    }, [props.isActive]);

    function validateOtp(event) {
        event.preventDefault();

        let otpCode = null;
        const formFields = event.target.elements;
        for (let formFieldIndex = 0; formFieldIndex < formFields.length; formFieldIndex++) {
            if (formFields[formFieldIndex].id === "otp_pin") {
                otpCode = formFields[formFieldIndex]["value"];
            }
        }

        setLoadingAnimation(true);
        props.user.validateOtp(
            otpCode,
            () => {
                setLoadingAnimation(false);
                window.location.href="/symptoms";

            }, (request) => {

                setLoadingAnimation(false);
                if(Validate.isNotEmpty(request.response.data)){
                    setErrors(request.response.data.error);
                }else{
                    setErrors("Something went wrong. Please try again")
                }
            }
        );
    }

    function resendSms() {
        setLoadingAnimation(true);
        props.user.resendSms(
            () => {
                setLoadingAnimation(false);
            }, (requst) => {
                setLoadingAnimation(false);
                setErrors("Something went wrong. Please try again")
            }
        );
    }

    return (
        <>
            <div className={`form otp-validation-form ${otpValidationFormState}`}>
                <div className={"inner-form"}>
                    <h2>PIN Validation</h2>
                    <span className={"text"}>Please input the PIN number that you received on your smartphone</span>
                    <form onSubmit={validateOtp}>
                        <div className="pin-number-fields">
                            <InputField
                                id="otp_pin"
                                name="PIN"
                                type={"number"}
                                validation={[Validate.isNotEmpty, Validate.containsOnlyNumbers]}
                                variation="pin"
                            />
                        </div>
                        <SubmitButton text="Submit"/>
                    </form>
                    <span className={`errors ${errors == "" ? "hidden" : ""}`}>{errors}</span>
                    <LoadingAnimation state={showLoadingAnimation}/>
                    <a className="form-link" onClick={resendSms}>Didn't get an SMS? Let us re resend it. </a>
                </div>
            </div>
        </>
    );
}

export default OtpValidationForm;

