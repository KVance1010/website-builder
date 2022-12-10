import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

import React, { useState } from 'react';

import Card from './Card';

import { useDragDropManager } from 'react-dnd'


const style = {
    position: 'relative',
    height: '100%',
    width: '100%',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}
export default function Dustbin() {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();

    const [cards, setCards] = useState([]);

    const [x, setX] = useState();
    const [y, setY] = useState();

    React.useEffect(() => monitor.subscribeToOffsetChange(() => {
        const offset = monitor.getClientOffset();
        if (offset) {
            setX(offset.x);
            setY(offset.y);
        }
        console.log(x, y);
    }), [monitor]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => {
            setCards([...cards, <Card x={x} y={y} key={cards.length} />])
        },
        // hover: (item, monitor) => {
        //     if (monitor.getClientOffset()) {
        //         console.log(item);
        //         setLastHoverPosition(monitor.getClientOffset());
        //     }

        //     console.log(lastHoverPosition);
        // },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
            {isActive ? 'Release to drop' : 'Drag a box here'}
            {cards}
        </div>
    )
}