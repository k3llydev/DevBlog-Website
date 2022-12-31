import { AnyAction } from 'redux';
import {
    HOME_UPDATE_ANIMATION
} from '../../types';

export const initialState = {
    activeAnimations: {
        firstLabel: false,
        secondLabel: false
    }
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HOME_UPDATE_ANIMATION:
        return {
            ...state,
            activeAnimations: {
                ...state.activeAnimations,
                [action.key]: action.isActive
            }
        };

    default:
        return state;
  }
};

export default reducer;
