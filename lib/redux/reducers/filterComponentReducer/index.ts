import { AnyAction } from 'redux';
import {
    OPEN_FILTER_SELECTION,
    CLOSE_FILTER_SELECTION,
    UPDATED_LABEL_FILTER_SELECTION,
    UPDATED_CATEGORY_FILTER_SELECTION,
    UPDATED_CATEGORY_FILTER_SELECTION_UNSELECT,
    RESET_FILTER,
    RESET_SELECTED
} from '../../types';

export const initialState = {
    isSelectingFilters: false,
    selectedLabel: '',
    selectedCategory: ''
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case OPEN_FILTER_SELECTION:
        return {
            ...state,
            isSelectingFilters: true
        };

    case CLOSE_FILTER_SELECTION:
        return {
            ...state,
            isSelectingFilters: false
        };
    
    case UPDATED_LABEL_FILTER_SELECTION:
        return {
            ...state,
            selectedLabel: action.selected
        };

    case UPDATED_CATEGORY_FILTER_SELECTION:
        return {
            ...state,
            selectedCategory: action.selected
        }
    case UPDATED_CATEGORY_FILTER_SELECTION_UNSELECT:
        return {
            ...state,
            selectedCategory: initialState.selectedCategory
        };

    case RESET_FILTER:
        return {
            ...state,
            ...initialState
        };

    case RESET_SELECTED:
        return {
            ...state,
            ...initialState,
            isSelectingFilters: state.isSelectingFilters
        };

    

    default:
        return state;
  }
};

export default reducer;
