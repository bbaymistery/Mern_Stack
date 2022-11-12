import { DARK_LIGHT_TOGGLE, DARK, LIGHT } from "./darkLightTypes";

const initialState = {
    darkMode: false,
}
export const darkLightModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIGHT: {
            return {
                darkMode: false,
            };
        }
        case DARK: {
            return {
                darkMode: true,
            };
        }
        case DARK_LIGHT_TOGGLE: {
            return {
                darkMode: !state.darkMode,
            };
        }
        default:
            return state;
    }
}