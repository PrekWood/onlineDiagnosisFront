import React, {useEffect, useState} from "react";
import {ReactComponent as CheckSvg} from "../../imgs/check.svg";
import LoadingAnimation from "../../../../SharedComponents/LoadingAnimation/LoadingAnimation";
import Validate from "../../../../Classes/Validate";
import TranslatedText from "../../../../SharedComponents/TranslatedText/TranslatedText";
import doctorImg from "../../imgs/doctor.png"
import sorryImg from "../../imgs/sorry.png"


export default function DiagnosisDetails(props) {

    const [loadingState, setLoadingState] = useState(true);

    function getFormattedDoctors(diagnosis) {
        let doctorsList = [];
        for (let issueIndex = 0; issueIndex < diagnosis.length; issueIndex++) {
            let issue = diagnosis[issueIndex];
            for (let doctorIndex = 0; doctorIndex < issue.doctors.length; doctorIndex++) {
                let doctor = issue.doctors[doctorIndex];

                // Check if already added in list
                let searchResult = doctorsList.filter((d) => d.Name === doctor.Name);
                if (searchResult.length !== 0) {
                    continue;
                }

                doctorsList.push(doctor);
            }
        }
        return doctorsList;
    }

    useEffect(() => {
        if(props.diagnosis != null){
            setLoadingState(false);
        }
    }, [props.diagnosis])

    return <>
        <div className={`diagnosis-results ${Validate.isArrayEmpty(props.diagnosis) ? "empty" : ""}`}>
            <LoadingAnimation state={loadingState}/>

            <div className={"issue-container"}>
                {Validate.isArrayEmpty(props.diagnosis) ? "" : (
                    <>
                        <div className={"svg-center"}>
                            <CheckSvg/>
                        </div>
                        <span>
                            <TranslatedText
                                language={props.language}
                                text={"Based on your symptoms we believe that you may be dealing with"}
                            />
                        </span>
                    </>
                )}

                {Validate.isArrayEmpty(props.diagnosis) ? "" : props.diagnosis.map((result) => {
                    return (
                        <div className="diagnosis-issue" key={result.Issue.ID}>
                            <div className={"issue-info"}>
                                <span className={"issue-name"}>
                                    <TranslatedText
                                        language={props.language}
                                        text={result.Issue.ProfName}
                                    />
                                </span>
                                <span className={"issue-propability"}>{`${result.Issue.Accuracy.toFixed(2)} %`}</span>
                            </div>
                            <span className={"issue-desc"}>
                                <TranslatedText
                                    language={props.language}
                                    text={result.Issue.Description.Description}
                                />
                            </span>
                        </div>
                    )
                })}


            </div>


            <div className={"doctors-container"}>
                {Validate.isArrayEmpty(props.diagnosis) ? "" : (
                    <>
                        <div className={"svg-center"}>
                            <img src={doctorImg}/>
                        </div>
                        <span>
                            <TranslatedText
                                language={props.language}
                                text={"We suggest you to see one of the following doctors"}
                            />
                        </span>
                    </>
                )}

                {Validate.isArrayEmpty(props.diagnosis) ? "" : getFormattedDoctors(props.diagnosis).map((doctor) => (
                    <div className="diagnosis-issue">
                        <div className="issue-info">
                        <span className={"issue-name"}>
                            <TranslatedText
                                language={props.language}
                                text={doctor.Name}
                            />
                        </span>
                            <span className={"issue-propability"}>{`${doctor.Accuracy.toFixed(2)} %`}</span>
                        </div>
                    </div>
                ))}

            </div>


           {Validate.isArrayEmpty(props.diagnosis) && !loadingState ?
                <>
                    <div className={"sorry-container"}>

                        <div className={"svg-center"}>
                            <img src={sorryImg}/>
                        </div>
                        <span>
                            <TranslatedText
                                language={props.language}
                                text={"We are sorry but we could not find something that fits your symptoms"}
                            />
                        </span>
                    </div>
                </>
                : ""}
        </div>


    </>
}