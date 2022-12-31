import { Dispatch } from 'redux';
import {
    APP_HEADER_SHOW,
    APP_HEADER_HIDE
} from '../types';

export const showHeader = () => (dispatch: Dispatch<any>) => dispatch({ type: APP_HEADER_SHOW });

export const hideHeader = () => (dispatch: Dispatch<any>) => dispatch({ type: APP_HEADER_HIDE });
