import { listenStorage } from '../../../lib';

const StorageManager = ({ storage, store, children }) => {
    listenStorage(storage, store);

    return children;
};

export default StorageManager;
