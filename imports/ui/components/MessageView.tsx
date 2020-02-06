import React from 'react';
import { Tracker } from 'meteor/tracker';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import StyledMessageView from '../elements/StyledMessageView';
import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import MessageBox from './MessageBox';
import { Chat, Message, MessageType } from '../../api/models';
import { MessagesCollection } from '../../api/messages';

const icons:string[] = ["search", "paperclip", "ellipsis-v"];

const MessageView = (props:any):JSX.Element => {
    const selectedChat:Chat = props.selectedChat;
    let messages:Message[];
    Tracker.autorun(()=> {
        messages = MessagesCollection.find({chatId: selectedChat._id}).fetch();
    });
    const handleSend = (content:string):void => {
        const message:Message = {
            chatId: selectedChat._id,
            content,
            createdAt: moment().toDate(),
            senderId: Meteor.userId(),
            type: MessageType.TEXT,
            read: false
        }
        Meteor.call('message.insert', message, (err, res)=> {
            if(err) {
                console.log('err insert msg', err);
            } else {
                console.log('res', res);
            }
        })
    }
    return (
        <StyledMessageView>
            <Header iconClass="greyIcon" icons={icons}>
                <Avatar avatar_url={selectedChat.picture} />
                <div className="headerMsg--container">
                    <span className="headerMsg--title">{selectedChat.title}</span>
                    <span className="headerMsg--sbTitle">en ligne</span>
                </div>
            </Header>
            <MessageBox messages={messages} />
            <Footer onSend={handleSend} />
        </StyledMessageView>
    )
}

export default MessageView;