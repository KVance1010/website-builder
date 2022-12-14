import React, { useState, useRef, useCallback } from 'react';

import '../styles/EditableBodyText.css'

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';

import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import useClickOutside from "./UseClickOutside";

export default function EditableBodyText({ cards, setCards, parentId }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [opacity, setOpacity] = useState(1);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState('rgba(0, 0, 0, 0)');
    const [editText, setEditText] = useState(false);

    /* Background color picker stuff */
    const [colorEdit, toggleColorEdit] = useState(false);
    const colorPopover = useRef();

    const closeColorSelector = useCallback(() => toggleColorEdit(false), []);
    useClickOutside(colorPopover, closeColorSelector);

    const { text, style: { fontSize, color: { r, g, b } } } = cards[parentId].bodyStyles[0];

    const styles = {
        fontSize: fontSize,
        color: `rgba(${r}, ${g}, ${b}, ${opacity})`
    };

    const setHoveredEffect = () => {
        setOpacity(.5);
        setIconVisibility(true);
    };

    const removeHoveredEffect = () => {
        setOpacity(1);
        setIconVisibility(false);
    };

    const onMouseEnter = (e) => {
        // console.log('MOUSE ENTER EDITABLE');
        setHoveredEffect();
    };

    const onMouseLeave = (e) => {
        // console.log('MOUSE LEAVE EDITABLE');
        if (!open) {
            removeHoveredEffect();
        }
    };

    const onMouseEnterIcon = (e) => {
        // console.log('MOUSE ENTER ICON');
        setHoveredEffect();
        setIconBackground('rgba(0, 0, 0, .30)');
    };

    const onMouseLeaveIcon = (e) => {
        // console.log('MOUSE LEAVE ICON');
        if (!open) {
            removeHoveredEffect();
            setIconBackground('rgba(0, 0, 0, 0)');
        }
    };

    /*  */
    const pointerOverIcon = (x, y) => {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
            if (element.id === 'edit-icon') {
                return true;
            }
        }

        return false;
    }

    const pointerOverEditable = (x, y) => {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
            if (element.classList.value.includes('editable')) {
                return true;
            }
        }

        return false;
    }

    const handleBlur = (e) => {
        setEditText(false);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (e) => {
        if (pointerOverIcon(e.clientX, e.clientY)) {

        } else if (pointerOverEditable(e.clientX, e.clientY)) {
            setIconBackground('rgba(0, 0, 0, 0)');
        } else {
            removeHoveredEffect();
            setIconBackground('rgba(0, 0, 0, 0)');
        }
    };

    const handleColorChange = ({ r, g, b }) => {
        const newCards = [...cards];
        newCards[parentId].bodyStyles[0].style.color.r = r;
        newCards[parentId].bodyStyles[0].style.color.g = g;
        newCards[parentId].bodyStyles[0].style.color.b = b;

        setCards(newCards);
    }

    const handleEditColor = (e) => {
        closeMenu(e);
        setAnchorEl(null);

        toggleColorEdit(true);
    }

    const handleClose = (e) => {
        closeMenu(e);
        setAnchorEl(null);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            setEditText(false);
        }
    }

    const handleTextChange = (e) => {
        const input = e.target.value;

        setText(input);
    }

    const setText = (text) => {
        const newCards = [...cards];
        newCards[parentId].bodyStyles[0].text = text;

        setCards(newCards);
    };

    const handleEditText = (e) => {
        closeMenu(e);
        setAnchorEl(null);

        setEditText(true);
    }

    let cardHeaderHeight;
    const cardHeader = document.getElementById(`editable-card-header-${parentId}`);
    if (cardHeader) {
        cardHeaderHeight = cardHeader.offsetHeight;
    }

    return (
        <>
            {editText ?
                <TextField
                    hiddenLabel
                    id="hidden-label-small"
                    value={text}
                    variant="outlined"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleTextChange}
                    onKeyDown={onKeyDown}
                />
                :
                <p className="card-text position-relative editable-body-text"
                    style={{ ...styles }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseOver={onMouseEnter}
                >
                    {text}
                    {iconVisibility && (
                        <>
                            <EditIcon
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    color: 'black',
                                    backgroundColor: iconBackground,
                                    borderRadius: 1
                                }}
                                id="edit-icon"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onMouseEnter={onMouseEnterIcon}
                                onMouseLeave={onMouseLeaveIcon}
                                onClick={handleClick}
                            />
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'edit-icon',
                                }}
                            >
                                <MenuItem onClick={handleEditText}>Edit Text</MenuItem>
                                <MenuItem onClick={handleEditColor}>Edit Color</MenuItem>
                            </Menu>
                        </>
                    )}
                </p>
            }
            {colorEdit && (
                <div className="card-body-text-popover"
                    ref={colorPopover}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '101%',
                        transform: `translateY(-${cardHeaderHeight}px)`
                    }}
                >
                    <RgbaColorPicker color={{ r, g, b, a: 1 }} onChange={handleColorChange} />
                </div>
            )}

            {/* {backgroundColorEdit && (
                <div className="popover"
                    ref={backgroundColorPopover}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '101%'
                    }}
                >
                    <HexColorPicker color={backgroundColor} onChange={handleBackgroundColorChange} />
                </div>
            )} */}
        </>
        // React.cloneElement(
        //     html,
        //     {
        //         onDrag: onDrag,
        //         onMouseOver: onMouseOver,
        //         onMouseOut: onMouseOut,
        //     },
        //     [html.props.children]
        // )
    );
}