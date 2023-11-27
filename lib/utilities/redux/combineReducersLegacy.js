import { combineReducers } from 'redux';
import bindStateToLocalStorage from '../middleware/bindStateToLocalStorage';

const combineReducersLegacy = (pReducers = {}, pStoreName) => {
    return bindStateToLocalStorage(combineReducers(pReducers), pStoreName);
};

export default combineReducersLegacy;
