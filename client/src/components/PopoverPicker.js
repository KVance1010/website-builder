import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";

import useClickOutside from "./ClickOutside";



export const PopoverPicker = ({ color, onChange }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <div style={{ position: 'relative', right: '15px' }} className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};