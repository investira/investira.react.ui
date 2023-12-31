/* eslint-disable no-unused-vars */
const storage = {
    listenStorage: (pStorage, pStore, pAction = null, pChangesOptions = {}) => {
        pStorage.db
            .changes({ live: true, include_docs: true, ...pChangesOptions })
            .on('change', ({ id, changes, doc }) => {
                if (!pStorage.docRevs[id]) return;
                console.log('pStorage', pStorage);
                // skip if we are the instigators of the change
                //if (doc._rev === pStorage.docRevs[id]) return;

                //console.log(id, changes, doc);

                console.log(id, pStorage.docRevs[id]);
                console.log('pStorage.docRevs[id] === doc._rev', pStorage.docRevs[id] === doc._rev);

                pStorage.docRevs[id] = doc._rev;

                pStore.dispatch({
                    type: 'DB_CHANGE',
                    payload: doc.doc
                });
            })
            .on('error', err => {
                console.log('ERROOOOOOOO', err);
            });
    }
};

export default storage;
