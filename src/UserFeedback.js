import { useEffect, useState } from "react";
import { useGlobalStateValue } from "./context/GlobalStateProvider";
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import { createUserFeedback, getUserFeedback } from "./RequestUtils";

export default function UserFeedback({}) {

    // Context
    const [{botIdCookie}, dispatch] = useGlobalStateValue();
    const [feedbackText, setFeedbackText] = useState("");
    const [userHadIssues, setUserHadIssues] = useState(false);
    const [userAlreadySentFeedback, setUserAlreadySentFeedback] = useState(false);

    useEffect(() => {
        updateIfUserAlreadySentFeedback();
    }, []);

    const updateUserFeedback = (event) => {
        setFeedbackText(event.target.value);
    }

    const handleSelectedButton = (option) => {
        setUserHadIssues(option);
    }

    const updateIfUserAlreadySentFeedback = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getUserFeedback(botIdCookie);
            if(apiResponse) {
                setUserAlreadySentFeedback(true);
                setUserHadIssues(apiResponse.hadTroubleWithGraphs);
                setFeedbackText(apiResponse.moreFeedback);
            }
        }
    }

    const handleBackToSendFeedback = () => {
        setUserAlreadySentFeedback(false)
    }

    async function handleCreateFeedback() {
        const apiResponse = await createUserFeedback(
            botIdCookie,
            JSON.stringify(
                {
                    hadTroubleWithGraphs: userHadIssues,
                    moreFeedback: feedbackText
                }
            )
        )
        if(apiResponse) {
            setUserAlreadySentFeedback(true);
        }
    }

    const renderNotSentFeedbackYet = () => {
        return (
            <div className='userfeedback__container'>
                <FeedbackTwoToneIcon fontSize="large" className="userfeedback__icon" />
                <div className="userfeedback__title">
                    <h1>Rate our product!</h1>
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
                    <p>Improvement ideas, issues that you had, everything is welcome!</p>
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
                    onClick={handleCreateFeedback}
                >
                    <p>Send feedback</p>
                </button>
            </div>
        )
    }

    const renderAlreadySentFeedback = () => {
        return (
            <div className='userfeedback__container'>
                <FeedbackTwoToneIcon fontSize="large" className="userfeedback__icon" />
                <div className="userfeedback__title">
                    <h1>Rate our product!</h1>
                    <h2>Thanks for sending your feedback!</h2>
                </div>
                <button
                    className="userfeedback__changeresponsebutton"
                    onClick={handleBackToSendFeedback}
                >
                    <p>Change my response</p>
                </button>
            </div>
        )
    }

    const renderFeedbackSection = () => {
        if(userAlreadySentFeedback) {
            return renderAlreadySentFeedback()
        } else {
            return renderNotSentFeedbackYet()
        }
    }

    return renderFeedbackSection()
}