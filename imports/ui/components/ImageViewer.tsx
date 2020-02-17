import React from 'react';
import FontAwesome from 'react-fontawesome';

import StyledImageViewer from '../elements/StyledImageViewer';

const ImageViewer = (props:any):JSX.Element => {
    const {imageUrl, onClose} = props;
    return (
        <StyledImageViewer>
            <div className="IV--close">
                <FontAwesome 
                    name="times"
                    className="IV--icon"
                    onClick={onClose}
                />
            </div>
            <div className="IV--imageContainer">
                <img 
                    className="IV--image"
                    src={imageUrl}
                    alt="image"
                />
            </div>
        </StyledImageViewer>
    )
}

export default ImageViewer;