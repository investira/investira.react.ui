import { listenStorage } from '@investira/utilities';

const StorageManager = ({ storage, store, children }) => {
    listenStorage(storage, store);

    return children;
};

StorageManager.displayName = 'StorageManager';

export default StorageManager;
