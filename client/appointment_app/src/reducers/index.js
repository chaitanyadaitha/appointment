import { combineReducers, CombineReducers } from "redux";

import appointments from "./appointments";
import doctors from './doctors';

export default combineReducers({
  doctors,
  appointments
});
