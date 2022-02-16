import React from 'react';
import store from '../../store/index';
export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    componentDidMount(){ 
        this.unsubscribe =store.subscribe(() => this.forceUpdate());
        console.log(        this.unsubscribe =store.subscribe(() => this.forceUpdate())
        );
     }
     componentWillUnmount(){
       this.unsubscribe();
     }
     

    render() {
        if(!store.getState().user)
 {
        return ( 
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="input-wrapper">
                        <div>Email Address</div> 
                        <input className="input" type="text" placeholder="Email Address" value={this.state.email} onChange={ e => this.setState({ email: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                      <div>Password</div> 
                      <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>
            
                    <div className="btn" onClick={() => this.props.signIn(this.state.email, this.state.password)}>Sign in</div> 
                </div> 
            </div>
        )
    }
                               
  else if (store.getState().user.role ==="admin")

  {
    window.location.replace("/dashboard");
 
  }
  else{
    window.location.replace('/community-quizzes');

  }
   }
}