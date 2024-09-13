import { useState } from "react";
import { useGlobalStateValue } from "./context/GlobalStateProvider";
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';

export default function UserFeedback({}) {

    // Context
    const [{}, dispatch] = useGlobalStateValue();
    const [feedbackText, setFeedbackText] = useState("");
    const [userHadIssues, setUserHadIssues] = useState(false);

    const updateUserFeedback = (event) => {
        setFeedbackText(event.target.value);
    }

    const handleSelectedButton = (option) => {
        setUserHadIssues(option);
    }

    return (
        <div className='userfeedback__container'>
            <FeedbackTwoToneIcon fontSize="large" className="userfeedback__icon" />
            <div className="userfeedback__title">
                <h1>Rate our product</h1>
                <p>We would love your feedback.</p>
            </div>
            <div className="userfeedback__question1">
                <h2>Have you had any issues creating graphs?</h2>
                <div className="userfeedback__buttons">
                    <button
                        className={userHadIssues === false ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedButton(false)}
                    >
                        <p>No</p>
                    </button>
                    <button
                        className={userHadIssues === true ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedButton(true)}
                    >
                        <p>Yes</p>
                    </button>
                </div>
            </div>
            <div className="userfeedback__question2">
                <h2>More information</h2>
                <p>Here it comes ideas......</p>
                <textarea
                    className="userfeedback__textarea"
                    placeholder="Write your thoughts here..."
                    onChange={updateUserFeedback}
                    value={feedbackText}
                />

            </div>
            <button
                className="userfeedback__sendbutton"
                disabled={feedbackText === ""}
            >
                <p>Send feedback</p>
            </button>
        </div>
    )
}