import React from 'react';
//import AppNavigator from './AppNavigator';
import CharterClubsNavigator from './src/CharterClubsNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import  ReduxThunk from 'redux-thunk';

import ClubsReducer from './store/reducers/Clubs';
import UsersReducer from './store/reducers/Users';
import MeetingsReducer from './store/reducers/Meetings';

const rootReducer = combineReducers({
  clubs: ClubsReducer,
  users: UsersReducer,
  meetings: MeetingsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const app = () => {
  return (
    <Provider store ={store}>
      <CharterClubsNavigator />
    </Provider>
  )
}

export default app;