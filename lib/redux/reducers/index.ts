import { combineReducers } from 'redux';

// Import reducers
import sampleReducer from './sampleReducer';
import filterComponentReducer from './filterComponentReducer';
import headerComponentReducer from './headerComponentReducer';
import homePageReducer from './homePageReducer';

export default combineReducers({
  sampleData: sampleReducer,
  filterArticles: filterComponentReducer,
  appHeader: headerComponentReducer,
  homePage: homePageReducer
});
