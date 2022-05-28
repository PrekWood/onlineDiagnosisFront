import Model from "./Model";
import axios from "axios";
import User from "./User";

export default class Language extends Model{
    constructor() {
        super();
        this.name = null;
        this.iso_code = null;
        this.image = null;
    }

    static castToLanguage(part){
        const lang = new Language();
        lang.name = part.name;
        lang.iso_code = part.iso_code;
        lang.image = part.image;
        return lang;
    }

    static loadBodyPartList(successMethod, errorMethod){
        const user = User.loadUserFromLocalStorage();
        axios({
            method: 'get',
            url: `${window.API_URL}/languages`,
            headers: this.getHeaders(user.token),
        }).then(function (response) {
            const availableLanguages = response.data;
            let availableLanguagesObj = [];
            for(let langIndex = 0; langIndex < availableLanguages.length; langIndex++){
                let lang = availableLanguages[langIndex];
                availableLanguagesObj.push(Language.castToLanguage(lang))
            }
            successMethod(availableLanguagesObj);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    translate(text, successMethod, errorMethod){
        const user = User.loadUserFromLocalStorage();
        axios({
            method: 'post',
            url: `${window.API_URL}/translate/`,
            headers: this.getHeaders(user.token),
            data: {
                tl: this.iso_code,
                text: text,
            }
        }).then(function (response) {
            successMethod(response.data.data.translations[0].translatedText);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    static getDefaultLang(){
        const lang = new Language();
        lang.name = "English";
        lang.iso_code = "en";
        lang.image = "gb.svg";
        return lang
    }



    isLang(){
        return true;
    }
}