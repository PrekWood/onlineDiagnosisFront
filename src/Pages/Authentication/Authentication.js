import React, {useEffect, useState} from "react";

import doctorImg from "./imgs/doctor.png";
import logo from "./imgs/logo.png";
import "./Authentication.css"
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import PhoneNumberForm from "./Components/PhoneNumberForm/PhoneNumberForm";
import OtpValidationForm from "./Components/OtpValidationForm/OtpValidationForm";
import Validate from "../../Classes/Validate";

export default function Authentication() {

    const [currentForm, setCurrentForm] = useState("login");
    const [user, setUser] = useState(null);

    useEffect(()=>{
        if(Validate.isNotEmpty(user) && !user.isEmpty()){
            user.saveUserToLocalStorage();
        }
    },[user])

    return (
        <>
            <div className={"Authentication"}>
                <div className={"doctor-container"}>
                    <img id={"logo"} src={logo} alt={"logo"}/>
                    <img id={"doctorImg"} src={doctorImg} alt={"doctorImg"}/>
                </div>

                <LoginForm
                    isActive={currentForm==="login"}
                    setCurrentForm={setCurrentForm}
                    setUser={setUser}
                />

                <RegisterForm
                    isActive={currentForm==="register"}
                    setCurrentForm={setCurrentForm}
                    setUser={setUser}
                />

                <PhoneNumberForm
                    isActive={currentForm==="phone-number"}
                    setCurrentForm={setCurrentForm}
                    user={user}
                    setUser={setUser}
                />

                <OtpValidationForm
                    isActive={currentForm==="otp-validation"}
                    setCurrentForm={setCurrentForm}
                    user={user}
                    setUser={setUser}
                />
            </div>
        </>
    );
}