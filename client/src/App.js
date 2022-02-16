import axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import MyQuizzes from './components/MyQuizzes/MyQuizzes';
import CommunityQuizzes from './components/CommunityQuizzes/CommunityQuizzes';
import ViewQuiz from './components/ViewQuiz/ViewQuiz';
import TakeQuiz from './components/TakeQuiz/TakeQuiz';
import ViewResults from './components/ViewResults/ViewResults';
import MyImages from './components/Profile/MyImages';
import Profile from './components/Profile/Profile';
import Dash from  './components/ViewResults/Dashboard';
import store from './store';
import Admin from './components/ViewResults/Admin';

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        store.dispatch({
          user: res.data.user,
          type: 'set_user'
        })
      }).catch(er => {
        console.log(er);
      })
    }
  }
  

  render() {
    return (
      <div className="app">

        <Router>
          <Switch>
            <Route exact path="/" component={Auth}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/community-quizzes" component={CommunityQuizzes} />
            <Route path="/create-quiz" component={CreateQuiz} />
            <Route path="/my-quizzes" component={MyQuizzes} />
            <Route path="/view-quiz" component={ViewQuiz} />
            <Route path="/take-quiz" component={TakeQuiz} />
            <Route path="/view-results" component={ViewResults} />
            <Route  path="/settings" component={Profile}/>
            <Route  path="/my-images" component={MyImages}/>
            <Route  path="/view" component={Dash}/>
            <Route  path="/admin" component={Admin}/>


            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
