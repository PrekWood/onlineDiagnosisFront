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
        axios({
            method: 'get',
            url: `${window.API_URL}/languages`,
            headers: this.getHeaders(),
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
        axios({
            method: 'post',
            url: `${window.API_URL}/translate/`,
            headers: this.getHeaders(),
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
        const langFromStorage = Language.loadLangFromLocalStorage();
        if(langFromStorage != null){
            return langFromStorage;
        }

        const lang = new Language();
        lang.name = "English";
        lang.iso_code = "en";
        lang.image = "gb.svg";
        return lang
    }
    static loadLangFromLocalStorage() {
        let lang = localStorage.getItem("language");
        if (lang == null || lang == "" || lang == undefined) {
            return null;
        }

        let langObj = null;
        try {
            langObj = JSON.parse(lang);
        } catch (e) {
            return null;
        }

        if (langObj == null) {
            return null;
        }

        const langToReturn = new Language();
        for (const property in langObj) {
            langToReturn[property] = langObj[property];
        }
        return langToReturn;
    }
    static saveUserToLocalStorage(lang){
        localStorage.setItem("language", JSON.stringify(lang));
    }
}