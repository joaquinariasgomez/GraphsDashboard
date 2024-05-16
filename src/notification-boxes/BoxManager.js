import { useGlobalStateValue } from "../context/GlobalStateProvider";
import AlertBox from "./AlertBox";
import ProfileBox from "./ProfileBox";
import GetProBox from "./GetProBox";
import PrivacyBox from "./PrivacyBox";
import TermsBox from "./TermsBox";

// Objective is to read state and prioritize boxes shown
// depending on priority. AlertBox has more priority than ProfileBox,
// as an example.
export default function BoxManager() {

    // Context
    const [{ showAlertBox, showProfileBox, showProBox, showPrivacyBox, showTermsBox }, dispatch] = useGlobalStateValue();

    const renderBox = () => {
        if(showAlertBox && showProfileBox) {
            return (
                <>
                    <ProfileBox />
                    <AlertBox />
                </>
            )
        }
        else {
            if (showAlertBox) {
                return (
                    <AlertBox />
                )
            }
            else if(showProfileBox) {
                return (
                    <ProfileBox />
                )
            } else if(showProBox) {
                return (
                    <GetProBox />
                )
            } else if(showPrivacyBox) {
                return (
                    <PrivacyBox />
                )
            } else if(showTermsBox) {
                return (
                    <TermsBox />
                )
            }
        }
    }

    return (
        <div className="boxmanager">
            { renderBox() }
        </div>
    )
}