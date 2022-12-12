import React, { useState, useRef } from 'react';

import { useDrag, useDragDropManager } from 'react-dnd';
import { ItemTypes } from './ItemTypes'
import { Resizable } from 'react-resizable';

import Editable from './Editable';

export default function Card({ id, left, top, children }) {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    // const [canDrag, setCanDrag] = useState(true);
    const canDrag = useRef(true);

    const [position, setPosition] = useState({ left, top });

    const styles = {
        card: {
            width: width,
            height: height,
            position: 'absolute',
            left: position.left,
            top: position.top
        }
    };

    const type = ItemTypes.CARD;

    const onResize = (event, { element, size, handle }) => {
        setWidth(size.width);
        setHeight(size.height);
    };

    const onMouseOver = (e) => {
        canDrag.current = !e.target.matches('.react-resizable-handle');
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        item: (monitor) => {
            return {
                id,
                type,
                left,
                top,
                children,
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y
            }
        },
        canDrag: (monitor) => {
            return canDrag.current;
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }),
        [id, left, top, children]
    )

    if (isDragging) {
        return <div ref={drag}></div>
    }

    return (
        <Resizable height={height} width={width} onResize={onResize} onMouseOver={onMouseOver}>
            <div ref={drag} className="card text-center"
                style={styles.card}>
                {children}
                {/* <Editable
                    html={
                        <div className="card-header bg-primary text-white">
                            Greeting from state:
                        </div>
                    }
                />
                <div className="card-body">
                    <p className="card-text text-dark" style={{ fontSize: '50px' }}>
                        Hello!
                    </p>
                </div> */}
            </div>
        </Resizable>
    );
}