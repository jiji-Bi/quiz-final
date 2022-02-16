import React from 'react';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import ViewQuiz from '../ViewQuiz/ViewQuiz';
import ViewResults from '../ViewResults/ViewResults';
import Dashboardmin from "../ViewResults/Dashboard";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!localStorage.getItem('JWT_PAYLOAD')) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="sidebar">
                    
                    <Sidebar />
                </div>

               
                <div >

                        
                            <Dashboardmin/>
                    </div>

                        
                    </div>
        )
    }
}