import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { EditText, EditTextarea } from 'react-edit-text';

export default function Editable({ text, cardStyles, setCardStyles }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [opacity, setOpacity] = React.useState(1);
    const [iconVisibility, setIconVisibility] = React.useState(false);
    const [iconBackground, setIconBackground] = React.useState('rgba(0, 0, 0, 0)');
    const [editText, setEditText] = React.useState(false);

    // const [text, setText] = React.useState("Greetings from state:");

    // const [savedText, setSavedText] = React.useState('');

    // const handleTextReplace = (e) => {
    //     if (e.key === 'Enter') {
    //         setSavedText(e.target.value);
    //         setEditText(false);
    //     }
    // }

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
        setHoveredEffect();
    };

    const onMouseLeave = (e) => {
        if (!open) {
            removeHoveredEffect();
        }
    };

    const onMouseEnterIcon = (e) => {
        setHoveredEffect();
        setIconBackground('rgba(0, 0, 0, .30)');
    };

    const onMouseLeaveIcon = (e) => {
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

    const handleEditText = (e) => {
        closeMenu(e);
        setEditText(true);

        setAnchorEl(null);
    };

    const handleTextChange = (e) => {
        const input = e.target.value;

        setText(input);
    }

    const handleClose = (e) => {
        closeMenu(e);
        setAnchorEl(null);
    };

    const setText = (text) => {
        const newCardStyles = [...cardStyles];
        newCardStyles[0][0].text = text;
        console.log(newCardStyles[0][0].text);

        setCardStyles(newCardStyles);
    };

    return (
        <>
            <div
                className="card-header bg-primary editable"
                style={styles}
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
                    // onKeyUp={handleTextReplace}
                    />
                    :
                    <h6 className="card-title text-white m-0">{text}</h6>
                }
            </div>
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
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
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