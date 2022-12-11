import React, { useState, useRef } from 'react';

import { useDrag, useDragDropManager } from 'react-dnd';

import { ItemTypes } from './ItemTypes'



export default function Card({ id, left, top }) {
    const styles = {
        // width: 100,
        // height: 100
    };

    const type = ItemTypes.CARD;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        item: (monitor) => {
            return {
                id,
                type,
                left,
                top,
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y
            }
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }),
        [id, left, top]
    )

    if (isDragging) {
        return <div ref={drag}></div>
    }

    return (
        <div ref={drag} className="card text-center"
            style={{
                ...styles,
                position: 'absolute',
                left: left,
                top: top
            }}>
            <div className="card-header bg-primary text-white">
                Greeting from state:
            </div>
            <div className="card-body">
                <p className="card-text text-dark" style={{ fontSize: '50px' }}>
                    Hello!
                </p>
            </div>
        </div>);
}