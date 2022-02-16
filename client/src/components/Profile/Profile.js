import React from 'react';
import axios from 'axios';
import Toast from '../Toast/Toast';
import {NavLink} from "react-router-dom";
import './Upload.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MessagePopup from "../MessagePopup/MessagePopup";
import AutorenewIcon from '@material-ui/icons/Autorenew';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            previewSource: '',
            message: '',
            showToast: false,
            fileTypes: ['jpg', 'pdf', 'png', 'jpeg', 'image/jpg', 'image/pdf', 'image/png', 'image/jpeg'],
                    firstName: '',
                    lastName: ''
            
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

    handleFileInputChange = e => {
        const file = e.target.files[0];
        if(!this.state.fileTypes.includes(file.type)) {
            this.setState({
                message: 'Must be either jpg, pdf, or png'
            })
        } else {
            this.setState({
                message: ''
            })
            this.previewFile(file);
        }
    }

    previewFile = (file) => {
        if(file.size > 10000000) {
            this.setState({message: 'File size too big'});
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ previewSource: reader.result });
        }
    }

    handleSubmitFile = (e) => {
        e.preventDefault();
            if(this.state.message.length > 0 || !this.state.previewSource || Object.keys(this.state.user) < 1) return;
            axios.post('/api/users/upload-image', JSON.stringify({
                data: this.state.previewSource, 
                _id: this.state.user._id
            })).then((res) => {
                if(res.data && res.data.message) {
                    this.setState({
                        message: res.data.message,
                        fileInput: '',
                        previewSource: '',
                        showPopup: true
                    });
                } else {
                    this.setState({
                        fileInput: '',
                        previewSource: '',
                        message: 'Success',
                        showPopup: true
                    })
                }
                this.getUser();
            }).catch((err) => {
                console.log(err);
                this.setState({showPopup: true, message: 'Something went wrong uploading image'})
            })
    }

    render() {
        return (
            <div className="settings-wrapper">
                <Toast model={this.state.showToast} messsage={this.state.message} backgroundColor="#FF4539"/>
        <NavLink to="/community-quizzes"><ArrowBackIcon className="back" /></NavLink>
        <div className="header">
        <div>My Profile</div>
        <NavLink to="/my-images"><button className="image-btn" style={{border: 'none', fontSize: '.5em'}}>View all my images</button></NavLink>
        </div>
        <div className="cards">

                    {this.state.user &&
                            <div className="gauche">
                                <div className="img-uploader">
                                    <div>Upload Avatar Image</div>
                                    <div className="upload-box">
                                        <input onChange={(e) => this.handleFileInputChange(e)} type="file" />
                                        {this.state.previewSource ?
                                            <img className="display-image" src={this.state.previewSource} />
                                            : (this.state.user.avatar && this.state.user.avatar.url ? <img style={{borderRadius: '50%', objectFit: 'cover', margin: '20px auto 0 25px', width: '25vw', height: '25vw'}} className="display-image" src={this.state.user.avatar.url} />  : <img className="display-image" src={this.state.previewSource} /> )}
                                    </div>
                                    <div style={{color: this.state.message === 'Success' ? 'green' : 'red', fontSize: '.8em', margin: '20px 0'}}>{ this.state.message }</div>
                                    <button className="image-btn" style={{marginTop: '20px'}} onClick={(e) => this.handleSubmitFile(e)}>Save</button>
                                </div>
                            </div>
                    }
                    <div className="right">
                            <div>Change First Name</div>
                            <input type="text" placeholder="Change first name"onChange={e=> this.setState({firstName:e.target.value})} />
                        <div className="button-wrapper">
                            <button className="image-btn" style={{marginTop: '20px'}}onClick={(e) => this.props.firstName}>Save</button>
                        </div>
                    </div>
                                    </div>
                                    </div>

        )
    }
}