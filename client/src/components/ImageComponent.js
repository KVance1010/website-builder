import React, { useRef, useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

import ImageUploading from "react-images-uploading";

import '../styles/ImageComponent.css';

export default function ImageComponent(props) {
    const [image, setImage] = React.useState(null);
    const [imageVisibility, setImageVisibility] = useState(false);

    const imageRef = useRef(null);

    const onChange = (imageList, addUpdateIndex) => {
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

    // useEffect(() => {
    //     if (image) {
    //         const imageElement = <img ref={imageRef} src={image.data_url} alt="" width="100" />;
    //         console.log(imageRef.current);
    //     }
    // }, [image]);

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
    );

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
                                    height: 66.6
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
                </div>
            )}
        </ImageUploading>
    );
}