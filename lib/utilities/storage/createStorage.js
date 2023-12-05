/* eslint-disable no-unused-vars */
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        }
    };
};

export default function createStorage(pDB) {
    if (pDB) {
        return pDB;
    }

    const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

    return storage;
}
