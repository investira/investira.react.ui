import PouchDBStorage from 'redux-persist-pouchdb';

const pouchStorage = (pDBName, pOptions) => pDBName && new PouchDBStorage(pDBName, { ...pOptions });

export default pouchStorage;
