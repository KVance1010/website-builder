import React, { useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

import ImageUploading from "react-images-uploading";

import '../styles/ImageComponent.css';

export default function ImageComponent(props) {
    const [image, setImage] = React.useState(null);
    const [imageVisibility, setImageVisibility] = useState(false);
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setImage(imageList[0]);
        setImageVisibility(true);
    };

    const styles = {
        button: {
            width: 100,
            height: 66.66,
            margin: '10px 0'
        }
    };

    const [{ isDragging, }, drag] = useDrag(() => ({
        type: ItemTypes.IMAGE_COMPONENT,
        item: (monitor) => {
            return {
                image,
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y,
                position: monitor.getClientOffset()
            }
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }), [image, setImage]
    )

    console.log(image);

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
                <div className="upload__image-wrapper">
                    {imageVisibility ?
                        <div ref={drag} style={{ width: 'fit-content' }}>
                            <div
                                key={0}
                                className="image-item"
                                {...dragProps}
                                style={{
                                    backgroundImage: `url(${image.data_url})`,
                                    backgroundSize: 'contain',
                                    width: 100,
                                    height: 66.66
                                }}
                            >
                                {/* <img src={image.data_url} alt="" width="100" /> */}
                            </div>
                        </div>
                        :
                        <button
                            style={{ ...styles.button }}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                    }
                    {/* {imageVisibility && (
                        <div
                            key={0}
                            className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                        </div>
                    )} */}
                    {/* &nbsp;
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                    ))} */}
                </div>
            )}
        </ImageUploading>
    );
}