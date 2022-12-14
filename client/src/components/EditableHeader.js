import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import '../styles/EditableHeader.css'

import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import useClickOutside from "./UseClickOutside";

export default function EditableHeader({ text, cards, setCards, parentId }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [opacity, setOpacity] = React.useState(1);
    const [iconVisibility, setIconVisibility] = React.useState(false);
    const [iconBackground, setIconBackground] = React.useState('rgba(0, 0, 0, 0)');
    const [editText, setEditText] = React.useState(false);

    const { backgroundColor: { r: backgroundR, g: backgroundG, b: backgroundB }, color } = cards[parentId].header.style;

    /* background color picker */
    const [backgroundColorEdit, toggleBackgroundColorEdit] = React.useState(false);
    const [textColorEdit, toggleTextColorEdit] = React.useState(false);
    const backgroundColorPopover = React.useRef();
    const textColorPopover = React.useRef();

    const closeBackgroundColorSelector = React.useCallback(() => toggleBackgroundColorEdit(false), []);
    useClickOutside(backgroundColorPopover, closeBackgroundColorSelector);

    const closeTextColorSelector = React.useCallback(() => toggleTextColorEdit(false), []);
    useClickOutside(textColorPopover, closeTextColorSelector);

    const styles = {
        cardHeader: {
            backgroundColor: `rgba(${backgroundR}, ${backgroundG}, ${backgroundB}, ${opacity})`,
            color: color
        },
        h: {
            lineHeight: 1.5
        }
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

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            setEditText(false);
        }
    }

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
            if (element.classList.value.includes('editable-header')) {
                return true;
            }
        }

        return false;
    }

    const handleBackgroundColorChange = ({ r, g, b }) => {
        const newCards = [...cards];
        newCards[parentId].header.style.backgroundColor.r = r;
        newCards[parentId].header.style.backgroundColor.g = g;
        newCards[parentId].header.style.backgroundColor.b = b;

        setCards(newCards);
    }

    const handleTextColorChange = (e) => {
        const newCards = [...cards];
        newCards[parentId].header.style.color = e;

        setCards(newCards);
    }

    const handleEditBackgroundColor = (e) => {
        closeMenu(e);
        setAnchorEl(null);

        toggleBackgroundColorEdit(true);
    }

    const handleEditTextColor = (e) => {
        closeMenu(e);
        setAnchorEl(null);

        toggleTextColorEdit(true);
    }

    const handleBlur = (e) => {
        setEditText(false);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEditText = (e) => {
        handleClose(e);

        setEditText(true);
    };

    const handleTextChange = (e) => {
        const input = e.target.value;

        setText(input);
    }

    const handleClose = (e) => {
        closeMenu(e);
        setAnchorEl(null);
    };

    const handleRemoveHeader = (e) => {
        handleClose(e);

        const newCards = [...cards];
        newCards[parentId].header = null;

        setCards(newCards);
    }

    const setText = (text) => {
        const newCards = [...cards];
        newCards[parentId].header.text = text;

        setCards(newCards);
    };

    return (
        <>
            <div
                className="card-header editable-header"
                id={`editable-card-header-${parentId}`}
                style={styles.cardHeader}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
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
                    <h6
                        className="card-title m-0"
                        style={styles.h}
                    >{text}</h6>
                }
            </div>
            {backgroundColorEdit && (
                <div className="card-header-popover"
                    ref={backgroundColorPopover}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '101%'
                    }}
                >
                    <RgbaColorPicker color={{ r: backgroundR, g: backgroundG, b: backgroundB, a: 1 }} onChange={handleBackgroundColorChange} />
                </div>
            )}
            {textColorEdit && (
                <div className="popover"
                    ref={textColorPopover}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '101%'
                    }}
                >
                    <HexColorPicker color={color} onChange={handleTextColorChange} />
                </div>
            )}
            {iconVisibility ?
                <>
                    <EditIcon
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
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
                        <MenuItem onClick={handleEditBackgroundColor}>Edit Background Color</MenuItem>
                        <MenuItem onClick={handleEditTextColor}>Edit Text Color</MenuItem>
                        <MenuItem onClick={handleRemoveHeader}>Remove Header</MenuItem>
                    </Menu>
                </>
                :
                <></>}
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