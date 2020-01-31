import React from 'react';

import StyledLeft from '../elements/StyledLeft';
import Header from './Header';

const icons:string[] = ["circle-notch", "comment-alt", "ellipsis-v"];

const Left = (props:any):JSX.Element => {
    return (
        <StyledLeft>
            <Header icons={icons} iconClass="greyIcon" />
        </StyledLeft>
    )
}

export default Left;