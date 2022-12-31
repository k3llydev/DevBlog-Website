import { AnyAction, Dispatch } from 'redux';
import {
    OPEN_FILTER_SELECTION,
    CLOSE_FILTER_SELECTION,
    UPDATED_LABEL_FILTER_SELECTION,
    UPDATED_CATEGORY_FILTER_SELECTION,
    UPDATED_CATEGORY_FILTER_SELECTION_UNSELECT,
    RESET_FILTER,
    RESET_SELECTED
} from '../types';

export const openFilterView = () => (dispatch: Dispatch<any>) => dispatch({ type: OPEN_FILTER_SELECTION });

export const closeFilterView = () => (dispatch: Dispatch<any>) => dispatch({ type: CLOSE_FILTER_SELECTION });

export const updateSelectedLabel = (selected: string) => (dispatch: Dispatch<any>) => dispatch({ type: UPDATED_LABEL_FILTER_SELECTION, selected });

export const updateSelectedCategory = (selected: string) => (dispatch: Dispatch<any>) => dispatch({ type: UPDATED_CATEGORY_FILTER_SELECTION, selected });

export const updateSelectedCategoryUnselect = () => (dispatch: Dispatch<any>) => dispatch({ type: UPDATED_CATEGORY_FILTER_SELECTION_UNSELECT });

export const resetFilter = () => (dispatch: Dispatch<any>) => dispatch({ type: RESET_FILTER });

export const resetSelected = () => (dispatch: Dispatch<any>) => dispatch({ type: RESET_SELECTED });
