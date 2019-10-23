import React from 'react';
import TextField from '@material-ui/core/TextField';

class EmailInput extends React.Component{
    render(){
        const {email, onChange} = this.props;
        return  <TextField
        id="standard-name"
        label="Enter Email"
        value={email}
        onChange={onChange}
        margin="normal"
      />
    }

}

export default EmailInput;