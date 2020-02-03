import React from 'react';
import { Meteor } from 'meteor/meteor';

import StyledLeft from '../elements/StyledLeft';
import Header from './Header';
import Avatar from './Avatar';
import Status from './Status';
import Searchbar from './Searchbar';

const icons:string[] = ["circle-notch", "comment-alt", "ellipsis-v"];

const Left = (props:any):JSX.Element => {
    return (
        <StyledLeft>
            <Header icons={icons} iconClass="greyIcon">
                <Avatar avatar_url={Meteor.user().profile.picture}/>
            </Header>
            <Status />
            <Searchbar />
        </StyledLeft>
    )
}

export default Left;