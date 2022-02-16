import React, { useState } from 'react';
import Alert from '../Alert/Alert'
import {NavLink} from "react-router-dom";
import './Upload.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MessagePopup from "../MessagePopup/MessagePopup";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Toast from '../Toast/Toast';


export default function Upload() {
    
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };
   
        

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch(`http://localhost:9000/api/users/upload/${localStorage.getItem('_ID')}`, {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    
    return (
        <div className="settings-wrapper">
        <NavLink to="/dashboard"><ArrowBackIcon className="back" /></NavLink>

        <div className="header">
        <div>My Profile</div>

        <NavLink to="/my-images"><button className="image-btn" style={{border: 'none', fontSize: '.5em'}}>View all my images</button></NavLink>
        </div>

 <div className="cards">
    <div className="gauche">
          <div className="img-uploader">
                <div>Upload Avatar Image</div>
                      <Alert msg={errMsg} type="danger" />
                      <Alert msg={successMsg} type="success" />
                    <form  onSubmit={handleSubmitFile} className="form">
                    <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"/>
                    <button className="btn" type="submit">Submit</button>
                    </form>
                 </div>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '30px' }}
                />
            )}
             </div>
             <div className="right">
                        <div>
                            <div>Change First Name</div>
                            <input type="text" placeholder="Change first name"onChange={e=> this.setState({firstName:e.target.value})} />

                        </div>
                        <div className="button-wrapper">
                            <button className="image-btn" style={{marginTop: '20px'}}>Save</button>
                            
                        </div>
        </div>
        </div>
        </div>



    );
}