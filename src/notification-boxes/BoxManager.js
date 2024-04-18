import { useGlobalStateValue } from "../context/GlobalStateProvider";
import AlertBox from "./AlertBox";

// Objective is to read state and prioritize boxes shown
// depending on priority. AlertBox has more priority than ProfileBox,
// as an example.
export default function BoxManager() {

    // Context
    const [{ showAlertBox }, dispatch] = useGlobalStateValue();

    const renderBox = () => {
        if (showAlertBox) {
            return (
                <AlertBox />
            )
        }
    }

    return (
        <div>
            { renderBox() }
        </div>
    )
}