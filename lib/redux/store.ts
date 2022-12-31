import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducers';

const initalState = {};

// creating store
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initalState
});

export const ReduxWrapper = createWrapper(() => store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
