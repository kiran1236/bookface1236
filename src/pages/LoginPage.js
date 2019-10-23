import React from 'react';
import '../App.css';
import EmailInput from '../input/EmailInput';
import Typography from '@material-ui/core/Typography';
import PasswordInput from '../input/PasswordInput';
import SubmitButton from '../input/SubmitButton';
import localstorage from 'local-storage';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            user_credentials: [],
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailAddressChange(event) {
        console.log("handleEmailAddressChange called" + event.target.value);
        this.setState({ emailAddress: event.target.value });
    }
    handlePasswordChange(event) {
        console.log("handlePasswordChange called" + event.target.value);
        this.setState({ password: event.target.value });
    }
    snackbarClose = (event) => {
        this.setState({snackbaropen:false});
    }
    handleSubmit(event) {
        console.log("handleSubmit called");
        const { emailAddress } = this.state;
        const { password } = this.state;

        if(password.length < 6){
            this.setState({snackbaropen:true, snackbarmsg:"Password should be of length min 6 characters"});
        }
        else if(!emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({snackbaropen:true, snackbarmsg:"Email address not valid"});
        }
        else{
        const user_cred=localstorage.get("user_credentials");
        let loginSuccess=0;
       console.log("From Local Storage");
       user_cred.forEach(user => {
           const {emailAddress:user_email, password:user_password} = user;
           if(user_email === emailAddress && user_password === password ){
            loginSuccess=1;
            console.log("Found the user");
            localstorage.set('currentUser',user);
           }
       });
       if(loginSuccess===1){
       this.setState({snackbaropen:true, snackbarmsg:"LogIn Successful"});
       sleep(1000).then(() => {
        this.props.history.push('/home');
      })
    }
    else{
        this.setState({snackbaropen:true, snackbarmsg:"Wrong credentials"});
    }
    }
    }
    render() {
        const { emailAddress } = this.state;
        const { password } = this.state;
        return (
            <div className="nav-container">
                <Typography variant={"h4"}>
                    Log In
                    </Typography>
                <EmailInput email={emailAddress} onChange={this.handleEmailAddressChange} />
                <br/>
                <PasswordInput password={password} onChange={this.handlePasswordChange} />
                <br/>
                <SubmitButton onClick={this.handleSubmit}/>
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

export default withRouter(LoginPage);