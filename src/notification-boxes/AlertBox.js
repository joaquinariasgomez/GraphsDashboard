import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ALERT_BOX_TYPES } from "./AlertBoxConstants";

export default function AlertBox() {

    const [{ alertBoxType, alertBoxMessage }, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_ALERT_BOX,
            value: false
        })
    }

    const renderAlertBox = () => {
        return (
            <div className='alertbox__alert__container' onClick={e => { e.stopPropagation(); }}>
                <WarningIcon className='alertbox__alerticon' fontSize='large' />
                <h2>{alertBoxMessage}</h2>
                <button className='alertbox__alertbutton' onClick={closeBox}>
                    Ok
                </button>
            </div>
        );
    }

    const renderInfoBox = () => {
        return (
            <div className='alertbox__info__container' onClick={e => { e.stopPropagation(); }}>
                <InfoIcon className='alertbox__infoicon' fontSize='large' />
                <h2>{alertBoxMessage}</h2>
                <button className='alertbox__infobutton' onClick={closeBox}>
                    Ok
                </button>
            </div>
        );
    }

    return (
        <div className='alertbox__backdrop' onClick={closeBox}>
            {
                (alertBoxType === ALERT_BOX_TYPES.INFO) ?
                    renderInfoBox() : renderAlertBox()
            }
        </div>
    );
}