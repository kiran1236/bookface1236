import React, { Component } from 'react'
import '../App.css';
import localstorage from 'local-storage';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ProfilePage from './ProfilePage';
import LogoutButton from '../input/LogoutButton';
import { withRouter } from 'react-router-dom';
import Posts from '../navigation/Posts';
import NewPostButton from '../input/NewPostButton';
import PostTextArea from '../input/PostTextArea';
import SubmitButton from '../input/SubmitButton';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

export class PostTextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }
    handleLogout(event) {
       localstorage.remove("currentUser");
       this.props.history.push('/login');
    }
    snackbarClose = (event) => {
        this.setState({snackbaropen:false});
    }
    handleSubmit(event) {
        const currentUser=localstorage.get("currentUser");
        const posts = localstorage.get("posts");
        console.log(currentUser);
        const {name, emailAddress}=currentUser;
        const {text}= this.state;
        console.log("text area value is : "+text);
        const postId=localstorage.get("postIdGenerator")+1;
        const zero=0;
        const newPost = {postId:postId ,name:name, email:emailAddress, postMessage:text, likes:0, dislikes:0};
        posts.push(newPost);
        localstorage.set("posts",posts);
        localstorage.set("postIdGenerator",postId);
        this.setState({snackbaropen:true, snackbarmsg:"Posted Successfully"});
        sleep(1000).then(() => {
          this.props.history.push('/home');
        })
     }

     handleTextAreaChange(event) {
        console.log("Text area changed"+event.target.value);
        this.setState({ text: event.target.value });
     }
    render() {
        const {text} = this.state;
        return (
            <div>
            <Grid container spacing={8} >
            <Grid item sm={8} xs={12}>
                <Typography variant={"h4"}>
                    <PostTextArea text={text} onChange={this.handleTextAreaChange}/>
                    <SubmitButton onClick={this.handleSubmit}/>  <LogoutButton onClick={this.handleLogout}/>
                </Typography>
            </Grid>
        </Grid>
        <Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {2000} onClose={this.snackbarClose}
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ]}/>
        </div>
        )
    }
}

export default withRouter(PostTextPage);
