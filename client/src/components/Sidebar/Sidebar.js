import React from 'react';
import store from '../../store/index';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import { Image } from 'cloudinary-react';


export default class Sidebar extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    bgImage = () => {
        if(store.getState().user.avatar && store.getState().user.avatar.url) {
            return `url(${store.getState().user.avatar.url})`;
            
        } else {
            return `url(https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg)`;
        }
    }
    logout = () => {
        localStorage.clear();
        //this.props.history.push('/');
        window.location.replace("/");
    
    }
    render() {
        if (store.getState().user) {
            return (
                <div className="sidebar-wrapper">
                <div className="header">Quizzie-Easy</div> 
            
                <NavLink to="/settings">
                    <SettingsIcon className="settings-icon" />
                </NavLink>

                
                <div className="logout" onClick={()=> this.logout()}>Logout</div>
                <div className="user">
                        <div className="avatar" style={{backgroundImage: this.bgImage()}}></div>
                        <div className="name">{store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                    </div>

                    <div className="links">
                    { store.getState().user.role ==="admin"?
                        <NavLink to="/dashboard"><div className="link">Dashboard</div></NavLink>:   <div/>}
                                                <NavLink to="/community-quizzes"><div className="link">Community quizzes</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">My Quizzes</div></NavLink>
                        <NavLink to="/create-quiz"><div className="link">Create Quiz</div></NavLink>
                      
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
}