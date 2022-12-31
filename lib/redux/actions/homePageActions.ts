import { Dispatch } from 'redux';
import {
    HOME_UPDATE_ANIMATION
} from '../types';

export const homeUpdateAnimaiton = (key: string, isActive: boolean) => (dispatch: Dispatch<any>) => dispatch({ type: HOME_UPDATE_ANIMATION, key, isActive });
