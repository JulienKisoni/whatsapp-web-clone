import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import FlipMove from 'react-flip-move';

import StyledMessageBox from '../elements/StyledMessageBox';
import Day from './Day';
import MessageText from './MessageText';
import FABs from './FABs';
import MessageImage from './MessageImage';
import { updateBadges } from '../../api/helpers';

let isEven:boolean = false;
const format:string = "D MMMM Y";
let messagesEnd:HTMLDivElement;

const MessageBox = (props:any):JSX.Element => {
    const {selectedChat, messages, fabVisible, 
        onFABItemClick, onInputChange} = props;
    // messages est un tableau
    messages.forEach(message => {
        if(!message.senderId) {
            message.ownership = !!message.ownership === isEven ? 'mine' : 'other';
            isEven = !isEven;
            return message;
        } else {
            message.ownership = message.senderId === Meteor.userId() ? 'mine' : 'other';
            return message;
        }
    });
    // console.log('messages avec ownership', messages);

    // groupedMessages est un objet (dictionaire)
    const groupedMessages:any = _.groupBy(messages, message => {
        return moment(message.createdAt).format(format);
    })
    // console.log('groupedMessages', groupedMessages);
    const newMessages:any[] = Object.keys(groupedMessages)
                                .map(key => {
                                    return {
                                        date: key,
                                        groupedMessages: groupedMessages[key],
                                        today: moment().format(format) === key
                                    }
                                });
    // console.log('newMessages', newMessages);
    const renderMessages = (newMessage:any):JSX.Element[] => {
        // console.log('messages', newMessage.groupedMessages);
        return newMessage.groupedMessages.map(message => {
            const msgClass:string = `message message--${message.ownership}`;
            if(message.type === "image") {
                const mine:boolean = message.ownership === "mine";
                return (
                    <MessageImage 
                        key={message._id}
                        content={message.content}
                        createdAt={message.createdAt}
                        mine={mine}
                        onImgClick={() => props.onMsgTxtClick(message._id, "image")}
                    />
                )
            }
            return (
                <MessageText 
                    onClick={props.onMsgTxtClick}
                    key={message._id}
                    id={message._id}
                    msgClass={msgClass}
                    content={message.content}
                    ownership={message.ownership}
                    createdAt={message.createdAt}
                />
            )
        })
    }
    const scrollToBottom = ():void => {
        messagesEnd.scrollIntoView({behavior: "smooth"});
    }
    React.useEffect(()=> {
        scrollToBottom();
        updateBadges(selectedChat.participants, selectedChat._id);
    }, [selectedChat, messages]);

    const renderDays = ():JSX.Element[] => {
        return newMessages.map((newMessage, index:number) => {
            const dateText:string = newMessage.today ? "Aujourd'hui" : newMessage.date;
            return (
                <div key={index}>
                    <Day date={dateText} />
                    {renderMessages(newMessage)}
                </div>
            )
        })
    }
    return (
        <StyledMessageBox>
            <FABs 
                onFABItemClick={onFABItemClick}
                onInputChange={onInputChange} 
                fabVisible={fabVisible}
            />
            <FlipMove>
                {renderDays()}
            </FlipMove>
            <div
                ref={(el:HTMLDivElement)=> messagesEnd = el}
            />
        </StyledMessageBox>
    )
}

export default MessageBox;