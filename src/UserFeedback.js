import { useGlobalStateValue } from "./context/GlobalStateProvider";

export default function UserFeedback({}) {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    return (
        <div className='userfeedback__container'>
            <h2>TRhis is a test</h2>
        </div>
    )
}