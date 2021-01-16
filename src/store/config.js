import { createStore } from 'redux';

import favPeopleReducer from './reducers/favPeople';

export default createStore(favPeopleReducer);
