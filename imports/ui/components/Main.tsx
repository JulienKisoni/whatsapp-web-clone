import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import _ from 'lodash';

import Left from './Left';
import Right from './Right';
import StyledMain from '../elements/StyledMain';
import { Chat } from '../../api/models';
import { findChats } from '../../api/helpers';

const Main = (props:any):JSX.Element => {
    const [loading, setLoading] = React.useState<boolean>(true);
    Tracker.autorun(()=> {
        const chatsReady:boolean = Meteor.subscribe('chats.mine').ready();
        const messagesReady:boolean = Meteor.subscribe('messages.all').ready();
        // console.log('chats', findChats());
        if(chatsReady && messagesReady) {
            setLoading(false);
        }
    });

    const [messageVisible, setMessageVisible] = React.useState<boolean>(false);
    const [selectedChat, setSelectedChat] = React.useState<Chat>({});

    const handleChatClick = (_id:string):void => {
        // console.log('selected chat before', selectedChat);
        if(!messageVisible) {
            setMessageVisible(true);
        }
        const newChat:Chat = _.find(findChats(), {_id});
        // console.log('selected chat after', newChat);
        setSelectedChat(newChat);
    }

    return (
        <StyledMain>
            {!loading ? (
                <React.Fragment>
                    <Left 
                        chats={findChats()} 
                        onChatClick={handleChatClick} 
                        selectedChat={selectedChat}
                    />
                    <Right 
                        right 
                        messageVisible={messageVisible} 
                        selectedChat={selectedChat}
                    />
                </React.Fragment>
            ) : null}
        </StyledMain>
    )
}

export default Main;