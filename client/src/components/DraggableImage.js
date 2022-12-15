import React, { useState, useRef } from 'react';

export default function DraggableImage({ parentId, id, cards, setCards }) {
    const { data_url } = cards[parentId].bodyStyles[id];

    return (
        <img src={data_url} width="100" />
    );
}