import React, {useState} from "react";

import doctorImg from "./imgs/doctor.png";
import logo from "./imgs/logo.png";
import "./Authentication.css"
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
// import PhoneNumberForm from "./Components/PhoneNumberForm/PhoneNumberForm";
// import OtpValidationForm from "./Components/OtpValidationForm/OtpValidationForm";

export default function Authentication() {

    const [currentForm, setCurrentForm] = useState("login");

    return (
        <>
            <div className={"Authentication"}>
                <div className={"doctor-container"}>
                    <img id={"logo"} src={logo}/>
                    <img id={"doctorImg"} src={doctorImg}/>
                </div>

                <LoginForm
                    isActive={currentForm==="login"}
                    setCurrentForm={setCurrentForm}
                />

                <RegisterForm
                    isActive={currentForm==="register"}
                    setCurrentForm={setCurrentForm}
                />

                {/*<PhoneNumberForm*/}
                {/*    isActive={isPhoneNumberActive}*/}
                {/*    switchToRegister={switchToRegister}*/}
                {/*    switchToOtpValidation={switchToOtpValidation}*/}
                {/*    switchToLogin={switchToLogin}*/}
                {/*    countryCodesList={countryCodesList}*/}
                {/*/>*/}
                {/*<OtpValidationForm*/}
                {/*    isActive={isOtpValidationFormActive}*/}
                {/*    switchToRegister={switchToRegister}*/}
                {/*/>*/}
            </div>
        </>
    );
}