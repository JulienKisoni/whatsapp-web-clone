import React from 'react';
import {withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import StyledUsersList from '../elements/StyledUsersList';
import { User } from '../../api/models';
import UserItem from './UserItem';

const UsersList = (props:any):JSX.Element => {
    const users:User[] = props.users;
    const groupedUsers:string[] = _.groupBy(users, (user:User) => {
        return user.username.toUpperCase()[0];
    });
    const newUsers:any[] = Object.keys(groupedUsers)
                            .map(letter => {
                                return {
                                    letter,
                                    groupedUsers: groupedUsers[letter]
                                }
                            });
    // console.log('newUsers', newUsers);
    // console.log('groupedUsers', groupedUsers);
    // console.log('users', users);
    const renderUserItem = (userList:User[]):JSX.Element[] => {
        return userList.map(user => {
            return (
                <UserItem 
                    key={user._id}
                    id={user._id}
                    actu={user.profile.actu}
                    username={user.username}
                    picture={user.profile.picture}
                    onUserItemClick={props.onUserItemClick}
                />
            )
        });
    }

    const renderLetters = ():JSX.Element[] => {
        return newUsers.map((newUser, i:number) => {
            return (
                <React.Fragment key={i}>
                    <div className="letter">
                        {newUser.letter}
                    </div>
                    {renderUserItem(newUser.groupedUsers)}
                </React.Fragment>
            )
        })
    }
    return (
        <StyledUsersList>
            {renderLetters()}
        </StyledUsersList>
    )
}

export default withTracker((props:any)=> {
    return {
        users: props.pattern === "" ? Meteor.users.find({_id: {
            $ne: Meteor.userId()
        }}, {
            sort: {
                username: 1
            }
        }).fetch() : props.users2
    }
})(UsersList);