import { Meteor } from 'meteor/meteor';

import { createDummyUsers, createDummyChats, createDummyMessages } from '../imports/api/helpers';
import { dummyUsers } from '../imports/api/users';
import { ChatsCollection, dummyChats } from '../imports/api/chats';
import { MessagesCollection, DummyMessages } from '../imports/api/messages';

Meteor.startup(() => {
    const numberOfUsers:number = Meteor.users.find().count();
    const numberOfChats:number = ChatsCollection.find().count();
    const numberOfMessages:number = MessagesCollection.find().count();
    if(numberOfUsers === 0) {
        console.log("Il n'ya pas d'utilisateurs");
        createDummyUsers(dummyUsers);
    } else {
        console.log("Il y a des utilisateurs");
    }
    if(numberOfChats === 0) {
        console.log("Il n'ya pas de chats");
        createDummyChats(dummyChats);
    } else {
        console.log("Il y a des Chats");
    }
    if(numberOfMessages === 0) {
        console.log("Il n'ya pas de messages");
        createDummyMessages(DummyMessages);
    } else {
        console.log("Il y a des messages");
    }
});
