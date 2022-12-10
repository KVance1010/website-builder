import React, { useState } from 'react';

export default function Card({ x, y }) {
    const [position, setPosition] = useState({ x, y });

    const styles = {
        // width: 100,
        // height: 100
    };



    return (
        <div className="card text-center"
            style={{
                ...styles,
                position: 'absolute',
                left: position.x,
                top: position.y - 100
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