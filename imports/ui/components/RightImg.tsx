import React from 'react';

import StyledRightImg from '../elements/StyledRightImg';

const RightImg = (props:any):JSX.Element => {
    return (
        <StyledRightImg right={props.right}>
            <img 
                alt="bg"
                className="rigthImg--image"
                src='./images/whatsapp-bg-1.jpg'
            />
            <h3 className="rightImg--title">
                Gardez Votre Téléphone connecté
            </h3>
            <div className="rightImg--div">
                <p className="rightImg--p">
                    {props.messageText}
                </p>
                <div className="rightImg--divider" />
            </div>
            {props.children}
        </StyledRightImg>
    )
}

export default RightImg;