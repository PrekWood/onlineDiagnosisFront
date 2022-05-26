import React, {useEffect, useState} from "react";
import User from "../../Classes/User";

export default function SymptomsList() {

    const [user, setUser] = useState(null);

    useEffect(()=>{
        const user = User.loadUserFromLocalStorage();
        setUser(user);
        console.log(user);
    },[]);


    return (
        <>
            <div className={"SymptomsList"}>
                <h1>SymptomsList</h1>
            </div>
        </>
    );
}