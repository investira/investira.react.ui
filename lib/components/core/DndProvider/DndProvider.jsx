import { DndProvider as WarpDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isTouchDevice } from '../../utils/helpers';

const DndProvider = props => {
    const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

    return <WarpDndProvider backend={backendForDND} {...props} />;
};

export default DndProvider;
