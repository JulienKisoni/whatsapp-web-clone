import React from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import StyledMessageView from '../elements/StyledMessageView';
import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import MessageBox from './MessageBox';
import Modal from './Modal';
import { Chat, Message, MessageType } from '../../api/models';
import { MessagesCollection } from '../../api/messages';
import { uploadFile, findOtherId } from '../../api/helpers';

let fileInput:any;

const MessageView = (props:any):JSX.Element => {
    const icons:any[] = [
        {
            name: "search",
            func: ()=> {}
        },
        {
            name: "paperclip",
            func: ()=> {handlePaperClick()}
        },
        {
            name: "ellipsis-v",
            func: ()=> {}
        }
    ];
    const selectedChat:Chat = props.selectedChat;

    const [fabVisible, setFabVisible] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [selectedImage, setSelectedImage] = React.useState<any>("");
    const handlePaperClick = ():void => {
        setFabVisible(!fabVisible);
    }
    const handleInputClick = ():void => {
        const myInput:HTMLElement = document.getElementById('fileUpload');
        console.log('click ok', myInput);
        myInput.click();
    }
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        fileInput = e.target.files[0];
        console.log('fileInput', fileInput);
        if(fileInput) {
            setModalVisible(true);
            const fileReader:FileReader = new FileReader();
            fileReader.onload = function(e) {
                console.log('image', e.target.result);
                setSelectedImage(e.target.result);
            }
            fileReader.readAsDataURL(fileInput);
        }
    }
    const handleClose = ():void => {
        setModalVisible(false);
        setFabVisible(false);
    }
    const handleSend = (content:string, type:MessageType):void => {
        const message:Message = {
            chatId: selectedChat._id,
            content,
            createdAt: moment().toDate(),
            senderId: Meteor.userId(),
            type,
            read: false
        }
        if(modalVisible) {
            handleClose();
        }
        Meteor.call('message.insert', message, (err, id)=> {
            if(err) {
                console.log('err insert msg', err);
            } else {
                console.log('res', id);
                uploadFile(fileInput, true);
                Tracker.autorun(() => {
                    const imageUrl:string = Session.get('wwc__imageUrl');
                    if(imageUrl && message.type === "image") {
                        Meteor.call('message.update', id, imageUrl, (err, res)=> {
                            if(err) {
                                console.log('err', err);
                            } else {
                                console.log('ok', res);
                            }
                        });
                    }
                });
            }
        });
    }
    const avatarClick = ():void => {
        const otherId:string = findOtherId(selectedChat.participants);
        props.onAvatarClick(otherId);
    }
    return (
        <StyledMessageView>
            <Header OPVisible={props.OPVisible} iconClass="greyIcon" icons={icons}>
                <Avatar 
                    avatar_url={selectedChat.picture} 
                    onAvatarClick={avatarClick} 
                />
                <div className="headerMsg--container">
                    <span className="headerMsg--title">{selectedChat.title}</span>
                    <span className="headerMsg--sbTitle">en ligne</span>
                </div>
            </Header>
            {modalVisible ? (
                <Modal 
                    selectedImage={selectedImage} 
                    onClose={handleClose} 
                    onUpload={handleSend}
                />
            ) : (
                <React.Fragment>
                    <MessageBox 
                        selectedChat={selectedChat} 
                        messages={props.messages} 
                        fabVisible={fabVisible}
                        onFABItemClick={handleInputClick}
                        onInputChange={handleInputChange}
                        onMsgTxtClick={props.onMsgTxtClick}
                    />
                    <Footer onSend={handleSend} />
                </React.Fragment>
            )}
        </StyledMessageView>
    )
}

export default withTracker(({selectedChat})=> {

    return {
        messages: MessagesCollection.find({chatId: selectedChat._id}).fetch()
    }
})(MessageView);