import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

import { Chat } from './models';

export const ChatsCollection = new Mongo.Collection<Chat>('Chats');

export const dummyChats:Chat[] = [
    {
        title: "",
        picture: "",
        participants: ["nWsvn89XcWygkPdxM", "kSDkwuH87EvaEaBoF"],
        lastMessage: {
            content: "Salut ça va ?",
            createdAt: moment()
                        .toDate()   
        }
    },
    {
        title: "",
        picture: "",
        participants: ["8uMgSsDiNrnSQRe8z", "nWsvn89XcWygkPdxM"],
        lastMessage: {
            content: "Salut comment tu vas ?",
            createdAt: moment()
                        .subtract(1, 'days')
                        .toDate()   
        }
    },
    {
        title: "",
        picture: "",
        participants: ["kSDkwuH87EvaEaBoF", "8uMgSsDiNrnSQRe8z"],
        lastMessage: {
            content: "Hello !!",
            createdAt: moment()
                        .subtract(2, 'days')
                        .toDate()   
        }
    }
]

if(Meteor.isServer) {
    Meteor.publish('chats.all', function() {
        return ChatsCollection.find();
    });
    Meteor.publish('chats.mine', function() {
        return ChatsCollection.find({
            participants: {
                $in: [this.userId]
            }
        })
    })
}

