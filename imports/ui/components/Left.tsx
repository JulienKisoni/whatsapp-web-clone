import React from 'react';
import { Meteor } from 'meteor/meteor';

import StyledLeft from '../elements/StyledLeft';
import Header from './Header';
import Avatar from './Avatar';

const icons:string[] = ["circle-notch", "comment-alt", "ellipsis-v"];
const avatar_url:string = Meteor.user().profile.picture;

const Left = (props:any):JSX.Element => {
    return (
        <StyledLeft>
            <Header icons={icons} iconClass="greyIcon">
                <Avatar avatar_url={avatar_url}/>
            </Header>
        </StyledLeft>
    )
}

export default Left;