import React, { useState, useRef } from 'react';

import { useDrag, useDragDropManager } from 'react-dnd';
import { ItemTypes } from './ItemTypes'
import { Resizable } from 'react-resizable';

import EditableHeader from './EditableHeader';
import EditableBody from './EditableBody';
import EditableBodyText from './EditableBodyText'

export default function Card({ id, top, left, cards, setCards }) {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    // const [canDrag, setCanDrag] = useState(true);
    const canDrag = useRef(true);

    const styles = {
        card: {
            width: width,
            height: height,
            position: 'absolute',
            top: top,
            left: left
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
                top,
                left,
                type,
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
        [id, top, left, width, height]
    )

    if (isDragging) {
        return <div ref={drag}></div>
    }

    return (
        <Resizable height={height} width={width} onResize={onResize} onMouseOver={onMouseOver}>
            <div ref={drag} className="card text-center"
                style={styles.card}>
                <EditableHeader
                    cards={cards}
                    setCards={setCards}
                    parentId={id}
                    text={cards[id].header.text}
                />
                <EditableBody
                    parentId={id}
                    cards={cards}
                    setCards={setCards}
                >
                    <EditableBodyText
                        parentId={id}
                        cards={cards}
                        setCards={setCards}
                    />
                </EditableBody>
            </div>
        </Resizable>
    );
}