import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

import '../styles/EditableHeader.css'

import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import useClickOutside from "./ClickOutside";

import fonts from './Fonts'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function EditableHeader({ text, cards, setCards, parentId }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [opacity, setOpacity] = React.useState(1);
    const [iconVisibility, setIconVisibility] = React.useState(false);
    const [iconBackground, setIconBackground] = React.useState('rgba(0, 0, 0, 0)');
    const [editText, setEditText] = React.useState(false);
    const [editSize, setEditSize] = React.useState(false);

    /* background color picker */
    const [backgroundColorEdit, toggleBackgroundColorEdit] = React.useState(false);
    const [textColorEdit, toggleTextColorEdit] = React.useState(false);
    const [editFont, setEditFont] = React.useState(false);
    const backgroundColorPopover = React.useRef();
    const textColorPopover = React.useRef();
    const fontSelector = React.useRef();
    const fontSizeSlider = React.useRef();

    const closeBackgroundColorSelector = React.useCallback(() => toggleBackgroundColorEdit(false), []);
    useClickOutside(backgroundColorPopover, closeBackgroundColorSelector);

    const closeTextColorSelector = React.useCallback(() => toggleTextColorEdit(false), []);
    useClickOutside(textColorPopover, closeTextColorSelector);

    const closeFontSelector = React.useCallback(() => setEditFont(false), []);
    useClickOutside(fontSelector, closeFontSelector);

    const closeFontSize = React.useCallback(() => setEditSize(false), []);
    useClickOutside(fontSizeSlider, closeFontSize);

    const { backgroundColor: { r: backgroundR, g: backgroundG, b: backgroundB }, color, fontFamily, fontSize } = cards[parentId].header.style;

    const styles = {
        cardHeader: {
            backgroundColor: `rgba(${backgroundR}, ${backgroundG}, ${backgroundB}, ${opacity})`,
            color: color,
        },
        h: {
            lineHeight: 1.5,
            fontFamily,
            fontSize,
            fontWeight: 'bold'
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

    const handleEditTextFont = (e) => {
        handleClose(e);

        setEditFont(true);
    }

    const handleEditTextSize = (e) => {
        handleClose(e);

        setEditSize(true);
    }

    const handleFontChange = (e) => {
        const newCards = [...cards];

        newCards[parentId].header.style.fontFamily = e.target.value;

        setCards(newCards);
    }

    const handleFontSizeChange = (e) => {
        const newCards = [...cards];

        newCards[parentId].header.style.fontSize = e.target.value;

        setCards(newCards);
    }

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
            {editFont && (
                <FormControl
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        // transform: `translateY(100%)`,
                        left: 0,
                        bottom: 0
                    }}
                    ref={fontSelector}
                >
                    <InputLabel id="demo-simple-select-label">Font</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fontFamily}
                        label="Font"
                        onChange={handleFontChange}
                        MenuProps={MenuProps}
                    >
                        {fonts.map((font, index) =>
                            <MenuItem
                                key={index}
                                value={font}>{font}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            )}
            {editSize && (
                <Slider
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: `translateY(-100%)`,
                    }}
                    ref={fontSizeSlider}
                    // size="small"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    min={16}
                    max={50}
                />
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
                        <MenuItem onClick={handleEditBackgroundColor}>Edit Background Color</MenuItem>
                        <MenuItem onClick={handleEditText}>Edit Text</MenuItem>
                        <MenuItem onClick={handleEditTextColor}>Edit Text Color</MenuItem>
                        <MenuItem onClick={handleEditTextFont}>Edit Text Font</MenuItem>
                        <MenuItem onClick={handleEditTextSize}>Edit Text Size</MenuItem>
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