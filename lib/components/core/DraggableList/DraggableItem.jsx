import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'DraggableItem';

const style = {
    cursor: 'move'
};

const DraggableItem = memo(props => {
    // CONSTANTS
    const itemRef = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemType,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!itemRef.current) {
                return;
            }
            const xDragIndex = item.index;
            const xHoverIndex = props.index;

            // Não substitui itens por eles mesmos
            if (xDragIndex === xHoverIndex) {
                return;
            }
            // Determina o retângulo na tela
            const xHoverBoundingRect = itemRef.current?.getBoundingClientRect();
            // Obtém o meio vertical
            const xHoverMiddleY = (xHoverBoundingRect.bottom - xHoverBoundingRect.top) / 2;
            // Determina a posição do mouse
            const xClientOffset = monitor.getClientOffset();
            // Coloca os pixels no topo
            const xHoverClientY = xClientOffset.y - xHoverBoundingRect.top;
            // Só executa o movimento quando o mouse cruzou metade da altura dos itens
            // Ao arrastar para baixo, só move quando o cursor estiver abaixo de 50%
            // Ao arrastar para cima, só move quando o cursor estiver acima de 50%
            // Arrastando para baixo
            if (xDragIndex < xHoverIndex && xHoverClientY < xHoverMiddleY) {
                return;
            }
            /// Arrastando para cima
            if (xDragIndex > xHoverIndex && xHoverClientY > xHoverMiddleY) {
                return;
            }
            // Tempo para realmente executar a ação
            props.onMoveItem(xDragIndex, xHoverIndex);
            // Geralmente é melhor evitar mutações,
            // mas é bom aqui por causa do desempenho
            item.index = xHoverIndex;
        }
    });

    const [collected, drag] = useDrag({
        type: ItemType,
        item: () => {
            return { id: props.id, index: props.index };
        },
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            };
        }
    });

    const isDraggingStyle = collected.isDragging
        ? {
              opacity: 0.2,
              border: '1px dashed rgba(148, 158, 216, 1)'
          }
        : {};

    // Inicializa o drag nad drop no elemento
    drag(drop(itemRef));

    return (
        <div ref={itemRef} style={{ ...style, ...isDraggingStyle }} data-handler-id={handlerId}>
            {props.children}
        </div>
    );
});

DraggableItem.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onMoveItem: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

DraggableItem.displayName = 'DraggableItem';

export default DraggableItem;
