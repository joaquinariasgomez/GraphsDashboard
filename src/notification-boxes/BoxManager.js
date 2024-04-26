import { useGlobalStateValue } from "../context/GlobalStateProvider";
import AlertBox from "./AlertBox";
import ProfileBox from "./ProfileBox";

// Objective is to read state and prioritize boxes shown
// depending on priority. AlertBox has more priority than ProfileBox,
// as an example.
export default function BoxManager() {

    // Context
    const [{ showAlertBox, showProfileBox }, dispatch] = useGlobalStateValue();

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
            }
        }
    }

    return (
        <div className="boxmanager">
            { renderBox() }
        </div>
    )
}