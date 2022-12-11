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
export default function Box() {

    const type = ItemTypes.BOX;

    const [{ isDragging, }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: (monitor) => {
            return {
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y,
                position: monitor.getClientOffset()
            }
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

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
}