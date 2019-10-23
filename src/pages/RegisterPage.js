import React from 'react';
import NameInput from '../input/NameInput';
import EmailInput from '../input/EmailInput';
import Typography from '@material-ui/core/Typography';
import PasswordInput from '../input/PasswordInput';
import SubmitButton from '../input/SubmitButton';
import localstorage from 'local-storage';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withRouter } from 'react-router-dom';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            emailAddress: '',
            password: '',
            repassword: '',
            snackbaropen: false,
            snackbarmsg: ''
        };
        

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen:false});
    }

    handleNameChange(event) {
        console.log("handleNameChange called" + event.target.value);
        this.setState({ name: event.target.value });
    }
    handleEmailAddressChange(event) {
        console.log("handleEmailAddressChange called" + event.target.value);
        this.setState({ emailAddress: event.target.value });
    }
    handlePasswordChange(event) {
        console.log("handlePasswordChange called" + event.target.value);
        this.setState({ password: event.target.value });
    }
    handleRePasswordChange(event) {
        console.log("handleRePasswordChange called" + event.target.value);
        this.setState({ repassword: event.target.value });
    }
    handleSubmit(event) {
        console.log("handleSubmit called");
        const { name } = this.state;
        const { emailAddress } = this.state;
        const { password } = this.state;
        const { repassword } = this.state;
        
        const user_cred=localstorage.get("user_credentials");
        let alreadyRegistered=0;
        user_cred.forEach(user => {
           const {emailAddress:user_email} = user;
           if(user_email === emailAddress){
            alreadyRegistered=1;
           }
       });

       if(alreadyRegistered===1){
        console.log("User already registerd with that email id");
        this.setState({snackbaropen:true, snackbarmsg:"User already registerd with that email id"});
       }
        else if(password !== repassword){
            this.setState({snackbaropen:true, snackbarmsg:"Password doesnt match with each other"});
        }
        else if(password.length < 6 || repassword.length < 6){
            this.setState({snackbaropen:true, snackbarmsg:"Password should be of length min 6 characters"});
        }
        else if(!emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({snackbaropen:true, snackbarmsg:"Email address not valid"});
        }
        else{
        const user = {name, emailAddress, password};
        const user_cred = localstorage.get("user_credentials");
        user_cred.push(user);
        localstorage.set('user_credentials',user_cred);
        this.setState({snackbaropen:true, snackbarmsg:"Successfully Registered"});
        sleep(1000).then(() => {
            this.props.history.push('/login');
          })
        }
    }
    render() {
        const { name } = this.state;
        const { emailAddress } = this.state;
        const { password } = this.state;
        const { repassword } = this.state;
        return (
            <div style={{ padding: '1rem' }}>
                <Typography variant={"h4"}>
                    Register
                    </Typography>
                <NameInput name={name} onChange={this.handleNameChange} />
                <br />
                <EmailInput email={emailAddress} onChange={this.handleEmailAddressChange} />
                <br/>
                <PasswordInput password={password} onChange={this.handlePasswordChange} />
                <br/>
                <PasswordInput password={repassword} onChange={this.handleRePasswordChange} />
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

export default withRouter(RegisterPage);