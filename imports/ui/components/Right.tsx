import React from 'react';

import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';
import MessageView from './MessageView';

const messageText:string = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau WI-FI."

const Right = (props:any):JSX.Element => {
    const {right, messageVisible, onMsgTxtClick,
        selectedChat, onAvatarClick, OPVisible } = props;
    return (
        <StyledRight OPVisible={OPVisible}>
            {messageVisible ? (
                <MessageView 
                    onAvatarClick={onAvatarClick} 
                    selectedChat={selectedChat} 
                    OPVisible={OPVisible}
                    onMsgTxtClick={onMsgTxtClick}
                />
            ) : (
                <RightImg right={right} messageText={messageText} />
            )}
        </StyledRight>
    )
}

export default Right;