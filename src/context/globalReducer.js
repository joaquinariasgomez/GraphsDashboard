
export const initialState = {
    botIdCookie: "",
    session: {},
    showAlertBox: false,
    showProfileBox: false,  // We can have box profile and alert box enabled
    showProBox: false,
    showPrivacyBox: false,
    showTermsBox: false,
    showCreateGraphBox: false,
    alertBoxMessage: '',
    alertBoxType: null,
    userGraphs: [],
    userDesiredGraphs: [],
    isSubscribedToNotionGraphsPro: false
};

export const actionTypes = {
    SET_BOT_ID_COOKIE: "SET_BOT_ID_COOKIE",
    SET_SESSION: "SET_SESSION",
    SET_SHOW_ALERT_BOX: "SET_SHOW_ALERT_BOX",
    SET_SHOW_PROFILE_BOX: "SET_SHOW_PROFILE_BOX",
    SET_SHOW_PRO_BOX: "SET_SHOW_PRO_BOX",
    SET_SHOW_PRIVACY_BOX: "SET_SHOW_PRIVACY_BOX",
    SET_SHOW_TERMS_BOX: "SET_SHOW_TERMS_BOX",
    SET_SHOW_CREATE_GRAPH_BOX: "SET_SHOW_CREATE_GRAPH_BOX",
    SET_ALERT_BOX_MESSAGE: "SET_ALERT_BOX_MESSAGE",
    SET_ALERT_BOX_TYPE: "SET_ALERT_BOX_TYPE",
    SET_USER_GRAPHS: "SET_USER_GRAPHS",
    SET_USER_DESIRED_GRAPHS: "SET_USER_DESIRED_GRAPHS",
    SET_IS_SUBSCRIBED_TO_NOTION_GRAPHS_PRO: "SET_IS_SUBSCRIBED_TO_NOTION_GRAPHS_PRO"
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
        
        case actionTypes.SET_SHOW_PROFILE_BOX:
            return {
                ...state,
                showProfileBox: action.value,
            };

        case actionTypes.SET_SHOW_PRO_BOX:
            return {
                ...state,
                showProBox: action.value,
            };

        case actionTypes.SET_SHOW_PRIVACY_BOX:
            return {
                ...state,
                showPrivacyBox: action.value,
            };

        case actionTypes.SET_SHOW_TERMS_BOX:
            return {
                ...state,
                showTermsBox: action.value,
            };

        case actionTypes.SET_SHOW_CREATE_GRAPH_BOX:
            return {
                ...state,
                showCreateGraphBox: action.value,
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

        case actionTypes.SET_USER_GRAPHS:
            return {
                ...state,
                userGraphs: action.value,
            };

        case actionTypes.SET_USER_DESIRED_GRAPHS:
            return {
                ...state,
                userDesiredGraphs: action.value,
            };

        case actionTypes.SET_IS_SUBSCRIBED_TO_NOTION_GRAPHS_PRO:
            return {
                ...state,
                isSubscribedToNotionGraphsPro: action.value,
            };

        default:
            return state;
    }
};

export default globalReducer;