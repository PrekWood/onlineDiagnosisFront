import Model from "./Model";
import axios from "axios";
import User from "./User";

export default class BodyPart extends Model{
    constructor() {
        super();
        this.id = null;
        this.name = null;
        this.subLocations = [];
    }

    static castToBodyPart(part){
        const bodyPart = new BodyPart();
        bodyPart.id = part.id;
        bodyPart.name = part.name;
        if(bodyPart.name === undefined){
            bodyPart.name = part.locations;
        }
        return bodyPart;
    }

    static loadBodyPartList(successMethod, errorMethod){

        const user = User.loadUserFromLocalStorage();

        axios({
            method: 'get',
            url: `${window.API_URL}/body-parts`,
            headers: this.getHeaders(user.token),
        }).then(function (response) {
            const bodyParts = response.data;
            let bodyPartsObj = [];
            for(let bodyPartIndex = 0; bodyPartIndex < bodyParts.length; bodyPartIndex++){
                bodyPartsObj.push(BodyPart.castToBodyPart(bodyParts[bodyPartIndex]))
            }
            successMethod(bodyPartsObj);
        }).catch(function (error) {
            errorMethod(error);
        });
    }

    loadSublocations(successMethod, errorMethod){

        if(this.subLocations.length !== 0){
            successMethod(this);
            return ;
        }

        const user = User.loadUserFromLocalStorage();
        const bodyPart = this;

        axios({
            method: 'get',
            url: `${window.API_URL}/body-parts/${this.id}`,
            headers: this.getHeaders(user.token),
        }).then(function (response) {
            const bodyParts = response.data;
            let bodyPartsObj = [];
            for(let bodyPartIndex = 0; bodyPartIndex < bodyParts.length; bodyPartIndex++){
                bodyPartsObj.push(BodyPart.castToBodyPart(bodyParts[bodyPartIndex]))
            }
            bodyPart.subLocations = bodyPartsObj;
            successMethod(bodyPart);
        }).catch(function (error) {
            errorMethod(error);
        });
    }
}