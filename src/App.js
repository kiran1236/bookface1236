import React from 'react';
import './App.css';
import NavigationBar from './navigation/NavigationBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PostTextPage from './pages/PostTextPage';
import localstorage from 'local-storage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);
    const posts = [{postId:1 ,name:"Admin", email:"admin@gmail.com", postMessage:"Welcome to BookFace", likes:0, dislikes:0}]
    const likesAndDislikes = [{postId:1, email:"", likes:0, dislikes:0}];
    const user_credentials = [{name:"Admin", emailAddress:"admin@gmail.com", password:"admin"}];
    const currentUser={name:"NoUserLoggedIn", emailAddress:"NoUserLoggedIn", password:"NoUserLoggedIn"}
    localstorage.set("currentUser",currentUser);
    localstorage.set('user_credentials',user_credentials);
    localstorage.set("postIdGenerator",1);
    localstorage.set("likesAndDislikes",likesAndDislikes);
    localstorage.set("posts",posts);
    this.state = {
      posts: [{postId:1 ,name:"Admin", email:"admin@gmail.com", postMessage:"Welcome to BookFace", likes:0, dislikes:0}],
      likesAndDislikes: [{postId:1, email:"", likes:0, dislikes:0}],
      user_credentials: [{name:"Admin", emailAddress:"admin@gmail.com", password:"admin"}],
      currentUser: {name:"NoUserLoggedIn", emailAddress:"NoUserLoggedIn", password:"NoUserLoggedIn"},
      postIdGenerator: 1
  };


}
  render() {
    return (
      <div className="App">
        <Router>
         
            <NavigationBar />
            <div className="container">
            <Switch>
              <Route path="/login"> <LoginPage /> </Route>
              <Route path="/register"> <RegisterPage /></Route>
              <Route path="/home"> <HomePage /></Route>
              <Route path="/post"> <PostTextPage /></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
