import React, { useState, useRef, useCallback } from 'react';

import '../styles/EditableBody.css'

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import useClickOutside from "./UseClickOutside";

export default function EditableBody({ cards, setCards, parentId, children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [opacity, setOpacity] = useState(1);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState('rgba(0, 0, 0, 0)');
    const [editText, setEditText] = useState(false);

    /* Background color picker stuff */
    const [backgroundColorEdit, toggleBackgroundColorEdit] = useState(false);
    const backgroundColorPopover = useRef();

    const closeBackgroundColorSelector = useCallback(() => toggleBackgroundColorEdit(false), []);
    useClickOutside(backgroundColorPopover, closeBackgroundColorSelector);

    const { r, g, b } = cards[parentId].body.style;

    const styles = {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity} )`
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

    const onMouseOver = (e) => {

        console.log(pointerOverEditableBodyText(e.clientX, e.clientY));
        if (!pointerOverEditableBodyText(e.clientX, e.clientY)) {
            setHoveredEffect();
        } else {
            removeHoveredEffect();
        }
    }

    const onMouseLeave = (e) => {
        // console.log('MOUSE LEAVE EDITABLE');
        if (!open) {
            removeHoveredEffect();
        }
    };

    const onMouseEnterIcon = (e) => {
        console.log('MOUSE ENTER ICON');
        setHoveredEffect();
        setIconBackground('rgba(0, 0, 0, .30)');
    };

    const onMouseLeaveIcon = (e) => {
        console.log('MOUSE LEAVE ICON');
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

    const pointerOverEditableBody = (x, y) => {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
            if (element.classList.value.includes('editable-body')) {
                return true;
            }
        }

        return false;
    }

    const pointerOverEditableBodyText = (x, y) => {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
            if (element.classList.value.includes('editable-body-text')) {
                return true;
            }
        }

        return false;
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (e) => {
        if (pointerOverIcon(e.clientX, e.clientY)) {

        } else if (pointerOverEditableBody(e.clientX, e.clientY)) {
            setIconBackground('rgba(0, 0, 0, 0)');
        } else {
            removeHoveredEffect();
            setIconBackground('rgba(0, 0, 0, 0)');
        }
    };

    const handleBackgroundColorChange = ({ r, g, b }) => {

        const newCards = [...cards];
        newCards[parentId].body.style.r = r;
        newCards[parentId].body.style.g = g;
        newCards[parentId].body.style.b = b;

        setCards(newCards);
    }

    const handleEditBackgroundColor = (e) => {
        closeMenu(e);
        setAnchorEl(null);

        toggleBackgroundColorEdit(true);
    }

    const handleClose = (e) => {
        closeMenu(e);
        setAnchorEl(null);
    };

    return (
        <>
            <div className="card-body d-flex flex-row position-relative editable-body"
                key={1}
                style={styles}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {children}
                {iconVisibility ?
                    <>
                        <EditIcon
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
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
                            <MenuItem onClick={handleEditBackgroundColor}>Edit Background Color</MenuItem>
                            <MenuItem onClick={handleClose}>Add Text</MenuItem>
                        </Menu>
                    </>
                    :
                    <></>}
            </div>
            {backgroundColorEdit && (
                <div className="card-body-popover"
                    ref={backgroundColorPopover}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '101%',
                    }}
                >
                    <RgbaColorPicker color={{ r, g, b, a: 1 }} onChange={handleBackgroundColorChange} />
                </div>
            )}
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