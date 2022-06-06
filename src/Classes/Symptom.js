import Model from "./Model";
import axios from "axios";
import User from "./User";
import Validate from "./Validate";

export default class Symptom extends Model{
    constructor() {
        super();
        this.id = null;
        this.name = null;
        this.synonyms = null;
        this.hasRedFlag = null;
    }

    static castToSymptom(sym){
        const symptom = new Symptom();

        symptom.id = sym.id;
        if(Validate.isEmpty(symptom.id)){
            symptom.id = sym.ID;
        }
        symptom.name = sym.name;
        if(Validate.isEmpty(symptom.name)){
            symptom.name = sym.Name;
        }
        symptom.synonyms = sym.Synonyms;
        symptom.hasRedFlag = sym.HasRedFlag;
        return symptom;
    }

    static loadSymptomsList(successMethod, errorMethod){
        const user = User.loadUserFromLocalStorage();

        axios({
            method: 'get',
            url: `${window.API_URL}/symptoms`,
            headers: this.getHeaders(user.token),
        }).then(function (response) {
            const symptomsList = response.data;
            if(Validate.isEmpty(symptomsList)){
                successMethod([]);
                return;
            }
            let symptomsObjList = [];
            for(let symptomIndex = 0; symptomIndex < symptomsList.length; symptomIndex++){
                symptomsObjList.push(Symptom.castToSymptom(symptomsList[symptomIndex]))
            }
            successMethod(symptomsObjList);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    addToList(successMethod, errorMethod){
        const user = User.loadUserFromLocalStorage();

        axios({
            method: 'post',
            url: `${window.API_URL}/symptoms`,
            headers: this.getHeaders(user.token),
            data: {
                "id":this.id,
                "name":this.name,
            }
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    removeFromList(successMethod, errorMethod){
        const user = User.loadUserFromLocalStorage();

        axios({
            method: 'delete',
            url: `${window.API_URL}/symptoms`,
            headers: this.getHeaders(user.token),
            data: {
                "id":this.id,
            }
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }


    static emptySymptomsList(successMethod, errorMethod) {
        const user = User.loadUserFromLocalStorage();
        axios({
            method: 'delete',
            url: `${window.API_URL}/symptoms-all`,
            headers: this.getHeaders(user.token),
        }).then(function (response) {
            successMethod(response);
        }).catch(function (error) {
            errorMethod(error);
        });
    }
}