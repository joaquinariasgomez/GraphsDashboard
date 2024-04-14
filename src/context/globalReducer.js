
export const initialState = {
    botIdCookie: "",
    session: {}
};

export const actionTypes = {
    SET_BOT_ID_COOKIE: "SET_BOT_ID_COOKIE",
    SET_SESSION: "SET_SESSION"
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

        default:
            return state;
    }
};

export default globalReducer;