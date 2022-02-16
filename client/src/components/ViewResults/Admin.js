import Dashboard from  './Dashboard';
import React from 'react';
import store from '../../store/index';
export default class Admin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: null
            
        
        }
    }

    render() {
        return(
      <div>
 { store.getState().user.role =="admin"?
                     <Dashboard/> :'Youre not authorized'}
        
      </div>
       



        )
    }
}