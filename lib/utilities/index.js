// Utils
//import renders from './utils/renders';
import displays from './utils/displays';
import currency from './utils/currency';
//import charts from './utils/charts';
import browsers from './utils/browsers';
import localStorages from './utils/localStorages';
//import lists from './utils/lists';
//import vibrate from './utils/vibrate';
// Middleware
//import bindStateToLocalStorage from './middleware/bindStateToLocalStorage';
// Store
import createStore from './redux/createStore';
import persistStore from './redux/persistStore';
import listenStorage from './storage/listenStorage';
//import combineReducers from './redux/combineReducers';
//import combineReducersLegacy from './redux/combineReducersLegacy';
//import persisterReducers from './redux/persisterReducers';
import persistGateComponent from './redux/persistGateComponent';
// Storage
//import createStorage from './storage/createStorage';
//import pouchStorage from './storage/pouchStorage';
//import idbStorage from './storage/idbStorage';
// HOOKs
//import useLongPress from './hooks/useLongPress';
// Request
//import mockRequest from './request/mockRequest';
//import mockURLRequest from './request/mockURLRequest';

export {
    //renders, //FIXME: Gera um arquivo extra
    displays,
    currency,
    //charts, FIXME: Gera um arquivo extra
    browsers,
    localStorages, //FIXME: Gera um arquivo extra
    //lists, FIXME: Gera um arquivo extra
    //vibrate, FIXME: Gera um arquivo extra
    //bindStateToLocalStorage, FIXME: Gera um arquivo extra
    createStore,
    persistStore,
    //combineReducers, FIXME: Gera um arquivo extra
    //combineReducersLegacy, FIXME: Gera um arquivo extra
    persistGateComponent,
    //persisterReducers, FIXME: Gera um arquivo extra
    //createStorage, FIXME: Gera um arquivo extra
    listenStorage
    //pouchStorage //FIXME: Gera um erro (Object or null: undefined) e um arquivo extra
    //idbStorage, FIXME: Gera um arquivo extra
    //useLongPress, FIXME: Gera um arquivo extra
    // mockRequest, FIXME: Gera um arquivo extra
    // mockURLRequest FIXME: Gera um arquivo extra
};
