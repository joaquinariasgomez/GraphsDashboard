
export const initialState = {
    botIdCookie: ""
};

export const actionTypes = {
    SET_BOT_ID_COOKIE: "SET_BOT_ID_COOKIE"
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_BOT_ID_COOKIE:
            return {
                ...state,
                botIdCookie: action.value,
            };

        default:
            return state;
    }
};

export default globalReducer;