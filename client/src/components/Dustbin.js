import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

import React, { useState, useRef, useCallback } from 'react';

import Card from './Card';
import Editable from './Editable'

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
        {
            top: 20,
            left: 20,
        }
    ]);

    const [cardStyles, setCardStyles] = useState([
        [
            {
                text: "Greetings from state!",
                style: {
                    backgroundColor: '#0d6efd',
                    color: 'white'
                }
            },
            {
                text: "Hello!",
                style: {

                }
            }
        ]
    ])

    const cardsRef = useRef(cards);

    const createCard = useCallback(
        (item, x, y) => {
            const newCards = [...cards];
            const headerOffset = document.querySelector('header').offsetHeight;
            const sidebarOffset = document.getElementById('sidebar').offsetWidth;

            newCards.push({
                left: x - (sidebarOffset + item.xOffset),
                top: y - (headerOffset + item.yOffset),
                item: <Card key={cards.length} id={cards.length} />
            });

            setCards(newCards);
        },
        [cards, setCards]
    )

    // const moveCard = (id, left, top) => {
    //     const newCards = [...cards];
    //     cards[id].left = left;
    //     cards[id].top = top;

    //     setCards(newCards);
    // };

    const moveCard = useCallback(
        (id, left, top) => {
            const newCards = [...cards];
            newCards[id].left = left;
            newCards[id].top = top;

            setCards(newCards);
        },
        [cards, setCards],
    );

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [
            ItemTypes.CARD,
            ItemTypes.CARD_COMPONENT
        ],
        drop: (item, monitor) => {
            if (item.type === ItemTypes.CARD) {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(cards[item.id].left + delta.x)
                const top = Math.round(cards[item.id].top + delta.y)
                moveCard(item.id, left, top)
                return undefined
            } else if (ItemTypes.CARD_COMPONENT) {

                const position = monitor.getClientOffset();
                createCard(item, position.x, position.y);

                return undefined;
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),
        [cards, setCards]
    )

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
            {cards.map((card, index) =>
                <Card
                    key={index}
                    id={index}
                    top={card.top}
                    left={card.left}
                    cardStyles={cardStyles}
                    setCardStyles={setCardStyles}
                />
            )}
        </div>
    )
}