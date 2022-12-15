import React, { useState, useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { useDrag, useDrop, useDragDropManager } from 'react-dnd';
import { ItemTypes } from './ItemTypes'
import { Resizable } from 'react-resizable';

import EditableHeader from './EditableHeader';
import EditableBody from './EditableBody';
import EditableBodyText from './EditableBodyText'
import EditableImage from './EditableImage';

export default function Card({ id, cards, setCards }) {
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState(`rgba(0, 0, 0, 0)`);

    const { top, left, width, height } = cards[id];

    const canDrag = useRef(true);

    const styles = {
        div: {
            position: 'absolute',
            top: top,
            left: left
        },
        card: {
            minWidth: width,
            minHeight: height,
        }
    };

    const type = ItemTypes.CARD;

    const { header } = cards[id];

    const createImage = (item, monitor) => {
        const newCards = [...cards];
        newCards[id].bodyStyles.push({
            type: ItemTypes.IMAGE,
            ...item.image,
            style: {
                width: 100,
                height: 66.66
            }
        });

        setCards(newCards);
    }

    const handleRemoveCard = (e) => {
        const newCards = [...cards];
        newCards.splice(id, 1);

        setCards(newCards);
    }

    const onResize = (event, { element, size, handle }) => {
        const newCards = [...cards];

        newCards[id].width = size.width;
        newCards[id].height = size.height;

        setCards(newCards);
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

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [
            ItemTypes.IMAGE_COMPONENT
        ],
        drop: (item, monitor) => {
            createImage(item);
            return undefined;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),
        [cards, setCards]
    );

    const renderChild = (child, index) => {
        if (child.type === ItemTypes.BODY_TEXT) {
            return <EditableBodyText
                id={index}
                key={index}
                parentId={id}
                cards={cards}
                setCards={setCards}
            />;
        } else if (child.type === ItemTypes.IMAGE) {
            return <EditableImage
                id={index}
                key={index}
                parentId={id}
                cards={cards}
                setCards={setCards}
            />;
        } else {
            return null;
        }
    }

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
            <div ref={drop} style={styles.div}>
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
                        {cards[id].bodyStyles.map((child, index) => renderChild(child, index))}
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
            </div>
        </Resizable>
    );
}