import React, { useState, useRef } from 'react';

import ImageUploading from "react-images-uploading";

import CloseIcon from '@mui/icons-material/Close';

export default function EditableImage({ parentId, id, cards, setCards }) {
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState('rgba(0, 0, 0, 0)');

    const styles = {
        margin: '.5em 0px',
        width: 100,
        height: 66.66
    }

    const image = cards[parentId].bodyStyles[id];

    // const { data_url } = image;

    const handleRemoveImage = (e) => {
        const newCards = [...cards];
        newCards[parentId].bodyStyles.splice(id, 1);

        setCards(newCards);
    }

    const onChange = (imageList, addUpdateIndex) => {
        const newCards = [...cards];
        newCards[parentId].bodyStyles[id].data_url = imageList[0].data_url;
        newCards[parentId].bodyStyles[id].file = imageList[0].file;

        setCards(newCards);
    };

    const onMouseEnter = (e) => {
        setIconVisibility(true);
    }

    const onMouseLeave = (e) => {
        setIconVisibility(false);
    }

    const onMouseEnterIcon = (e) => {
        setIconVisibility(true);
        setIconBackground('rgba(0,0,0,.3)');
    }

    const onMouseLeaveIcon = (e) => {
        setIconVisibility(false);
        setIconBackground('rgba(0,0,0,0)');
    }

    return (
        <ImageUploading
            // multiple
            value={[image]}
            onChange={onChange}
            maxNumber={2}
            dataURLKey="data_url"
            acceptType={["jpg"]}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                // write your building UI
                <div className="upload__image-wrapper position-relative">
                    <img
                        src={image.data_url}
                        style={styles}
                        {...dragProps}
                        className="image-item editable-image"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                    {iconVisibility && (<CloseIcon
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            left: 0,
                            borderRadius: 1,
                            backgroundColor: iconBackground
                        }}
                        onMouseEnter={onMouseEnterIcon}
                        onMouseLeave={onMouseLeaveIcon}
                        onClick={handleRemoveImage}
                    />)}
                </div>
            )}
        </ImageUploading>)
}