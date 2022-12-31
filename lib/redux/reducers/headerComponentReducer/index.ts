import { AnyAction } from 'redux';
import {
    APP_HEADER_SHOW,
    APP_HEADER_HIDE
} from '../../types';

export const initialState = {
    show: false
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case APP_HEADER_SHOW:
        return {
            ...state,
            show: true
        };
    case APP_HEADER_HIDE:
        return {
            ...state,
            show: false
        };

    default:
        return state;
  }
};

export default reducer;
