import React from 'react';
import './MyImages.css';
import {NavLink} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessagePopup from '../MessagePopup/MessagePopup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import ChatIcon from '@material-ui/icons/Chat';

export default class MyImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            deletePopup: false,
            addBgImagePopup: false,
            addAvatarPopup: false,
            selectedImg: '',
            message: '',
            showMessage: false
        }
    }


    componentDidMount() {
        this.getUser();
    }
    

    getUser = () => {
        let id = localStorage.getItem('_ID');
        if (!id) {
            this.props.history.push('/');
            localStorage.clear();
        }
        axios.get('/api/users/' + id).then((res) => {
            this.setState({user: res.data.user})
        })
    }

    setUserAvatar = (type) => {
        console.log(this.state.selectedImg);
        axios.post('/api/users/set-avatar', {userId: this.state.user._id, publicId: this.state.selectedImg.publicId, url: this.state.selectedImg.url, type: type}).then(res => {
            this.setState({
                showMessage: true,
                message: res.data.message
            })
        }).catch(() => {
            this.setState({
                showMessage: true,
                message: 'Something went wrong, try again'
            })
        })
        setTimeout(() => {
            this.setState({
                message: '',
                showMessage: false,
                addAvatarPopup: false,
                addBgImagePopup: false
            })
        }, 2200);
    }

    removeImage = () => {
        axios.post('/api/users/remove-image', {userId: this.state.user._id, publicId: this.state.selectedImg.publicId, url: this.state.selectedImg.url}).then(res => {
            this.setState({
                showMessage: true,
                message: res.data.message
            })
            this.getUser();
        }).catch(() => {
            this.setState({
                showMessage: true,
                message: 'Something went wrong, try again'
            })
        })
        setTimeout(() => {
            this.setState({
                message: '',
                showMessage: false,
                deletePopup: false,
            })
        }, 2200);
    }

    render(){
        let ht = '';
        if(this.state.user && this.state.user.images.length === 0) {
            ht = `<div>You have no images uploaded yet</div>`
        }
        return (
            <div className="my-images">
            <NavLink to="/settings"><ArrowBackIcon className="back-icon"/></NavLink>
            <div className="header">My Images</div>
            <div className="images">
                {this.state.user ? this.state.user.images.map((image, idx) => (
                    <div className="my-image" key={idx}>
                        <img src={image.url} />
                        <div className="actions">
                            <CloseIcon onClick={() => this.setState({deletePopup: true, selectedImg: image})} className="delete"/>
                            <AccountCircleIcon onClick={() => this.setState({addAvatarPopup: true, selectedImg: image})} className="account" />
                        </div>
                    </div>
                )) : 'Not signed in'}
            </div>
            <div style={{textAlign: 'center', fontSize: '1.5em', marginTop: '30px'}} dangerouslySetInnerHTML={{ __html: ht }}></div>

            <MessagePopup model={this.state.deletePopup}>
                <div className="confirm-delete">
                    <div>Are you sure you wish to delete this image?</div>
                    <div className="buttons">
                        <button onClick={() => this.setState({deletePopup: false})}>Cancel</button>
                        <button onClick={() => this.removeImage()}>Confirm</button>
                    </div>
                </div>
            </MessagePopup>
            
            <MessagePopup model={this.state.addAvatarPopup}>
                    <div className="confirm-delete">
                        <div>Do you want to set this as your avatar?</div>
                        <div className="buttons">
                            <button onClick={() => this.setState({addAvatarPopup: false})}>Cancel</button>
                            <button onClick={() => this.setUserAvatar('avatar')}>Confirm</button>
                        </div>
                    </div>
                </MessagePopup>
                                    </div>


                    )
                    
    }

}