
export const initialState = {
    botIdCookie: "",
    session: {},
    showAlertBox: false,
    alertBoxMessage: '',
    alertBoxType: null
};

export const actionTypes = {
    SET_BOT_ID_COOKIE: "SET_BOT_ID_COOKIE",
    SET_SESSION: "SET_SESSION",
    SET_SHOW_ALERT_BOX: "SET_SHOW_ALERT_BOX",
    SET_ALERT_BOX_MESSAGE: "SET_ALERT_BOX_MESSAGE",
    SET_ALERT_BOX_TYPE: "SET_ALERT_BOX_TYPE"
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_BOT_ID_COOKIE:
            return {
                ...state,
                botIdCookie: action.value,
            };

        case actionTypes.SET_SESSION:
            return {
                ...state,
                session: action.value,
            };

        case actionTypes.SET_SHOW_ALERT_BOX:
            return {
                ...state,
                showAlertBox: action.value,
            };

        case actionTypes.SET_ALERT_BOX_MESSAGE:
            return {
                ...state,
                alertBoxMessage: action.value,
            };
        
        case actionTypes.SET_ALERT_BOX_TYPE:
            return {
                ...state,
                alertBoxType: action.value,
            };

        default:
            return state;
    }
};

export default globalReducer;