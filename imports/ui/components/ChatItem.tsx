import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import StyledChatItem from '../elements/StyledChatItem';
import Avatar from './Avatar';

const ChatItem = (props:any):JSX.Element => {
    const { title, picture, lastMessage } = props;
    const { content, createdAt } = lastMessage;
    const now:string = moment().format("D/MM/Y");
    const today:boolean = now === moment(createdAt).format("D/MM/Y");
    // console.log('today', today);

    // console.log('now', now);
    // console.log('createdAt', createdAt);
    // console.log('createdAt formated', moment(createdAt).format("D/MM/Y"));
    return (
        <StyledChatItem>
            <Avatar large avatar_url={picture} />
            <div className="chat--contentContainer">
                <div className="content--line1">
                    <span className="content--line1__title">
                        {title}
                    </span>
                    <div className="content--line1__date">
                        {today ? (
                            <Moment format="HH:mm">
                                {createdAt}
                            </Moment>
                        ) : (    
                            <Moment format="D/MM/Y">
                                {createdAt}
                            </Moment>
                        )}
                    </div>
                </div>
                <div className="content--line1">
                    <span className="content--message">
                        {content}
                    </span>
                    <div className="chat--badge">4</div>
                </div>
            </div>
        </StyledChatItem>
    )
}

export default ChatItem;
