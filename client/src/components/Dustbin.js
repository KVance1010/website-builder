import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

import React, { useState, useRef, useCallback } from 'react';

import Card from './Card';

import { useDragDropManager } from 'react-dnd'
import update from 'immutability-helper'
import { isITextSourceModel } from '@cloudinary/transformation-builder-sdk/internal/models/ITextSourceModel.js';

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
    const [cards, setCards] = useState([
        { top: 20, left: 20 }
    ]);

    const cardsRef = useRef(cards);

    const createCard = useCallback(
        (item, x, y) => {
            const newCards = [...cardsRef.current];
            const headerOffset = document.querySelector('header').offsetHeight;
            const sidebarOffset = document.getElementById('sidebar').offsetWidth;

            newCards.push({
                left: x - (sidebarOffset + item.xOffset),
                top: y - (headerOffset + item.yOffset)
            });

            cardsRef.current = newCards;
        },
        [cards, setCards]
    )

    const moveCard = useCallback(
        (id, left, top) => {
            const newCards = [...cardsRef.current];
            newCards[id].left = left;
            newCards[id].top = top;

            cardsRef.current = newCards;
        },
        [cards, setCards],
    );

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [
            ItemTypes.CARD,
            ItemTypes.BOX
        ],
        drop: (item, monitor) => {
            if (item.type === ItemTypes.CARD) {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                moveCard(item.id, left, top)
                return undefined
            } else if (ItemTypes.BOX) {

                const position = monitor.getClientOffset();
                createCard(item, position.x, position.y);

                return undefined;
            }
        },
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
            <div id="renderDiv"></div>
            {isActive ? 'Release to drop' : 'Drag a box here'}
            {cardsRef.current.map((card, index) =>
                <Card
                    key={index}
                    id={index}
                    left={card.left}
                    top={card.top}
                />
            )}
        </div>
    )
}