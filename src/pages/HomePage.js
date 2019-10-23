import React, { Component } from 'react';
import '../App.css';
import localstorage from 'local-storage';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ProfilePage from './ProfilePage';
import LogoutButton from '../input/LogoutButton';
import { withRouter } from 'react-router-dom';
import Posts from '../navigation/Posts';
import NewPostButton from '../input/NewPostButton';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.state = {
            snackbaropen: false,
            snackbarmsg: ''
        };
        
    }
    handleLogout(event) {
        alert("Logged out successfully");
        this.props.history.push('/login');   
        /*
        this.setState({snackbaropen:true, snackbarmsg:"Logout Successful"});
        sleep(1000).then(() => {
            
            localstorage.remove("currentUser");  
          })
       */
    }
    snackbarClose = (event) => {
        this.setState({snackbaropen:false});
    }
    handleNewPost(event) {
        this.props.history.push('/post');
     }
    
    render() {
        const currentUser=localstorage.get("currentUser");
        let name = "NoUserLoggedin";
        if(currentUser != null){
        name = currentUser["name"];
    }
        console.log("Current is : ")
        console.log(currentUser)
        localstorage.set("currentUser",currentUser);
        return (
            <div>
            <Grid container spacing={8} >
            <Grid item sm={8} xs={12}>
                <Typography variant={"h4"}>
                    Welcome {name} <NewPostButton onClick={this.handleNewPost} />
                    </Typography>
                    <div className="posts">
                    <Posts />
                    </div>
            </Grid>
            <Grid item sm={4} xs={12}>
                <ProfilePage />
                <br />
                <LogoutButton onClick={this.handleLogout}/>
            </Grid>
        </Grid>
        <Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {1000} onClose={this.snackbarClose}
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ]}/>
        </div>
        );
    }
}

export default withRouter(HomePage)