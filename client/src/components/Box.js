import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

import { useDragDropManager } from 'react-dnd'

// const style = {
//     border: '1px dashed gray',
//     backgroundColor: 'white',
//     padding: '0.5rem 1rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     cursor: 'move',
//     float: 'left',
// }

/**
 * Your Component
 */
export default function Box({ name }) {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();

    const initialClientOffset = useRef({});
    const initialSourceClientOffset = useRef({});

    const setInitialClientOffset = data => {
        initialClientOffset.current = data;
    }

    const setInitialSourceClientOffset = data => {
        initialSourceClientOffset.current = data;
    }

    const [{ isDragging, }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            console.log(initialClientOffset.current);
            console.log(initialSourceClientOffset.current);

            console.log(initialClientOffset.current.x - initialSourceClientOffset.current.x);
            console.log(initialClientOffset.current.y - initialSourceClientOffset.current.y);
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),

        }),
    }))

    React.useEffect(() => monitor.subscribeToOffsetChange(() => {
        const initialOffset = monitor.getInitialClientOffset();
        const initialSourceOffset = monitor.getInitialSourceClientOffset();
        if (initialOffset) {
            setInitialClientOffset(initialOffset);
        }
        if (initialSourceOffset) {
            setInitialSourceClientOffset(initialSourceOffset);
        }

        console.log(initialOffset);
        console.log(initialSourceOffset);
    }), [monitor]);

    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag} className="card text-center">
            <div className="card-header bg-primary text-white">
                Greeting from state:
            </div>
            <div className="card-body">
                <p className="card-text text-dark" style={{ fontSize: '50px' }}>
                    Hello!
                </p>
            </div>
        </div>
    );
    // return (
    //     <div ref={drag} style={{ ...style, opacity }}>
    //         {name}
    //     </div>
    // )
}