import React, {useEffect, useState} from "react";
import Select from "../Select/Select";
import Language from "../../Classes/Language";
import "./LanguageSelector.css"

export default function LanguageSelector(props) {

    const [availableLanguages, setAvailableLanguages] = useState([]);

    useEffect(()=>{
        Language.loadBodyPartList(
            (availableLangs)=>{
                const languageOptions = [];
                let count = 1;
                availableLangs.map((language)=>{
                    languageOptions.push({
                        id: count,
                        name: language.name,
                        iso_code: language.iso_code,
                        selected: language.iso_code === "en",
                        svg: `${window.BACKEND_BASE_URL}/imgs/country_flags/${language.image}`,
                        image: language.image,
                    })
                    count += 1;
                })
                setAvailableLanguages(languageOptions);
            },
            (req)=>{
            }
        )
    },[]);

    function changeLanguage(language){
        const langObj = Language.castToLanguage(language);
        props.setLanguage(langObj);
    }

    return <>
        <Select
            id="language_select"
            name="language-select"
            class="language-select"
            options={availableLanguages}
            callBack={changeLanguage}
        />
    </>
}