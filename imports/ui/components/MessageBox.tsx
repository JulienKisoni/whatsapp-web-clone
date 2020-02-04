import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';

import StyledMessageBox from '../elements/StyledMessageBox';

let isEven:boolean = false;
const format:string = "D MMMM Y";

const MessageBox = (props:any):JSX.Element => {
    const {messages} = props;
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
    console.log('messages avec ownership', messages);

    // groupedMessages est un objet (dictionaire)
    const groupedMessages:any = _.groupBy(messages, message => {
        return moment(message.createdAt).format(format);
    })
    console.log('groupedMessages', groupedMessages);
    return (
        <StyledMessageBox>
            Message Box
        </StyledMessageBox>
    )
}

export default MessageBox;