import axios from "axios";
import Validate from "./Validate";
import Model from "./Model";

export default class User extends Model {

    constructor() {
        super();
        this.idUser = null;
        this.email = null;
        this.token = null;
        this.password = null;
        this.phoneNumber = null;
        this.firstName = null;
        this.lastName = null;
        this.id = null;
        this.gender = null;
        this.year = null;
    }

    static castToUser(user) {
        const userObj = new User();
        userObj.id = user.id;
        userObj.idUser = user.idUser;
        userObj.email = user.email;
        userObj.token = user.token;
        userObj.password = user.password;
        userObj.phoneNumber = user.phoneNumber;
        userObj.firstName = user.firstName;
        userObj.lastName = user.lastName;
        userObj.gender = user.gender;
        userObj.year = user.year;
        return userObj;
    }

    login(successMethod, errorMethod, registerResponse = null) {
        console.log(`${window.API_URL}/login?username=${this.email}&password=${this.password}`);
        axios({
            method: 'post',
            url: `${window.API_URL}/login?username=${this.email}&password=${this.password}`,
            headers: this.getHeaders(),
        }).then(function (response) {
            if (registerResponse != null) {
                response.registerResponse = registerResponse;
            }
            successMethod(response);
        }).catch(function (error) {
            console.log(error)
            errorMethod(error);
        });
    }

    register(successMethod, errorMethod) {
        const thisUser = this;


        // First Register
        axios({
            method: 'post',
            url: `${window.API_URL}/user`,
            headers: this.getHeaders(),
            data: {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                gender: this.gender,
                year: this.year,
            }
        }).then(function (response) {
            // Then Login
            thisUser.login(successMethod, errorMethod, response)
        }).catch(function (error) {
            console.log(error);
            errorMethod(error);
        });
    }

    savePhoneNumberAndSendSms(successMethod, errorMethod) {
        console.log(`user.savePhoneNumberAndSendSms: ${this.token}, ${this.phoneNumber}`);

        axios({
            method: 'post',
            url: `${window.API_URL}/otp`,
            headers: this.getHeaders(this.token),
            data: {
                phoneNumber: this.phoneNumber
            }
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    saveUserToLocalStorage() {
        localStorage.setItem("loggedInUser", JSON.stringify(this));
    }

    resendSms(successMethod, errorMethod) {
        axios({
            method: 'post',
            url: `${window.API_URL}/otp/resend`,
            headers: this.getHeaders(this.token),
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    validateOtp(otpCode, successMethod, errorMethod) {
        console.log(`user.validateOtp: ${this.token}, ${otpCode}`);
        if (otpCode == "" || otpCode == null || otpCode == undefined) {
            errorMethod();
        }

        axios({
            method: 'post',
            url: `${window.API_URL}/otp/validate`,
            headers: this.getHeaders(this.token),
            data: {
                otpCode: otpCode,
            }
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    static loadUserFromLocalStorage() {
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser == null || loggedInUser == "" || loggedInUser == undefined) {
            return new User();
        }

        let loggedInUserJson = null;
        try {
            loggedInUserJson = JSON.parse(loggedInUser);
        } catch (e) {
            return new User();
        }

        if (loggedInUserJson == null) {
            return new User();
        }

        const userToReturn = new User();
        for (const property in loggedInUserJson) {
            userToReturn[property] = loggedInUserJson[property];
        }
        return userToReturn;
    }

    logout(successMethod, errorMethod) {
        localStorage.setItem("loggedInUser", null);
    }

    getUserDetails(successMethod, errorMethod) {
        axios({
            method: 'get',
            url: `${window.API_URL}/user/`,
            headers: this.getHeaders(this.token),
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    getDiagnosis(successMethod, errorMethod) {
        axios({
            method: 'post',
            url: `${window.API_URL}/diagnosis/`,
            headers: this.getHeaders(this.token),
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }



    update(successMethod, errorMethod) {
        axios({
            method: 'put',
            url: `${window.API_URL}/user`,
            headers: this.getHeaders(this.token),
            data:{
                firstName:this.firstName,
                lastName:this.lastName,
                email:this.email,
                year:this.year,
                gender:this.gender
            }
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

}