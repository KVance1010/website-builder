import React, { useEffect, useRef, useState } from 'react'; 

const UploadWidget = ({imageName}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    // const {imageName} = useState(true)
    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef);   
        // const name = props.imageName;  
        // console.log(imageName, "compNAME1")     
        widgetRef.current = cloudinaryRef.current.createUploadWidget( {            
            cloudName: 'dkc5agj8u',
            uploadPreset: 'websitebuilderv2',
            public_id: `${imageName}`
        }, function(error, result) {
            // console.log(imageName, "compNAME2")
            // console.log(result, "IMAGE UPLOAD RESULT")
            if(error){console.log(error, "I AM ERROR")}
        });
    }, [])
    return (
        <button className="btn btn-primary m-3" onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    )
};

export default UploadWidget;