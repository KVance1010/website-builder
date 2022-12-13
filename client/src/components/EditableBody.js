import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { EditText, EditTextarea } from 'react-edit-text';
import { blackwhite } from '@cloudinary/transformation-builder-sdk/actions/effect';

export default function EditableBody({ cards, setCards, parentId, children }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [opacity, setOpacity] = React.useState(1);
    const [iconVisibility, setIconVisibility] = React.useState(false);
    const [iconBackground, setIconBackground] = React.useState('rgba(0, 0, 0, 0)');
    const [editText, setEditText] = React.useState(false);

    const styles = {
        opacity: opacity,
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
        console.log('MOUSE ENTER EDITABLE');
        setHoveredEffect();
    };

    const onMouseLeave = (e) => {
        console.log('MOUSE LEAVE EDITABLE');
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

    const handleEditBackgroundColor = (e) => {
        handleClose(e);
    }

    const handleClose = (e) => {
        closeMenu(e);
        setAnchorEl(null);
    };

    const setText = (text) => {
        const newCards = [...cards];
        newCards[parentId].header.text = text;

        setCards(newCards);
    };

    return (
        <>
            <div className="card-body position-relative editable"
                key={1}
                style={{ ...styles, ...cards[parentId].body.style }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseEnter}
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
                            <MenuItem onClick={handleClose}>Edit Background Color</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </>
                    :
                    <></>}
            </div>
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