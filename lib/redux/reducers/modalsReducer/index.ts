import { AnyAction } from 'redux';
import {
    CLOSE_MODAL,
    OPEN_MODAL_WITH_SETTINGS
} from '../../types';

export const initialState = {
    isModalOpen: false,
    modalConfig: {}
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLOSE_MODAL:
        return {
            ...state,
            ...initialState
        };

    case OPEN_MODAL_WITH_SETTINGS:
        return {
            ...state,
            isModalOpen: true,
            modalConfig: action.payload
        };

    default:
        return state;
  }
};

export default reducer;
