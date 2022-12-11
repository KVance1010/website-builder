import React, { useEffect, useRef } from 'react'; 

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dkc5agj8u',
            uploadPreset: 'websitebuilderv2'
        }, function(error, result) {
            console.log(result)
        });
    }, [])
    return (
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    )
};

export default UploadWidget;