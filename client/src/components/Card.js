import React, { useState, useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { useDrag, useDragDropManager } from 'react-dnd';
import { ItemTypes } from './ItemTypes'
import { Resizable } from 'react-resizable';

import EditableHeader from './EditableHeader';
import EditableBody from './EditableBody';
import EditableBodyText from './EditableBodyText'

export default function Card({ id, top, left, cards, setCards }) {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState(`rgba(0, 0, 0, 0)`);

    const canDrag = useRef(true);

    const styles = {
        card: {
            minWidth: width,
            minHeight: height,
            position: 'absolute',
            top: top,
            left: left
        }
    };

    const type = ItemTypes.CARD;

    const { header } = cards[id];

    const handleRemoveCard = (e) => {
        const newCards = [...cards];
        newCards.splice(id, 1);

        setCards(newCards);
    }

    const onResize = (event, { element, size, handle }) => {
        setWidth(size.width);
        setHeight(size.height);
    };

    const onMouseLeave = (e) => {
        setIconVisibility(false);
    }

    const onMouseOver = (e) => {
        canDrag.current = !e.target.matches('.react-resizable-handle');
        setIconVisibility(true);
    };

    const onMouseIconEnter = (e) => {
        setIconBackground(`rgba(0, 0, 0, .3)`);
    }

    const onMouseIconLeave = (e) => {
        setIconBackground(`rgba(0, 0, 0, 0)`);
    }

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
        <Resizable
            height={height}
            width={width}
            onResize={onResize}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            <div
                ref={drag}
                className="card text-center"
                style={styles.card}
            >
                {header && (
                    <EditableHeader
                        cards={cards}
                        setCards={setCards}
                        parentId={id}
                        text={cards[id].header.text}
                    />
                )}
                <EditableBody
                    parentId={id}
                    cards={cards}
                    setCards={setCards}
                >
                    {cards[id].bodyStyles.map((child, index) =>
                    (<EditableBodyText
                        id={index}
                        key={index}
                        parentId={id}
                        cards={cards}
                        setCards={setCards}
                    />
                    ))}
                </EditableBody>
                {iconVisibility && (
                    <CloseIcon
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: iconBackground,
                            borderRadius: 1
                        }}
                        onMouseEnter={onMouseIconEnter}
                        onMouseLeave={onMouseIconLeave}
                        onClick={handleRemoveCard}
                    />)}
            </div>
        </Resizable>
    );
}