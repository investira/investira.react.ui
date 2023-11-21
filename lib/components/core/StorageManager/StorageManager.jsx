import { listenStorage } from '../../../utilities';

const StorageManager = ({ storage, store, children }) => {
    listenStorage(storage, store);

    return children;
};

export default StorageManager;
