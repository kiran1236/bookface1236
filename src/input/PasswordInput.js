import React from 'react';
import TextField from '@material-ui/core/TextField';

class PasswordInput extends React.Component{
    render(){
        const {password, onChange} = this.props;
        return  <TextField
        id="standard-name"
        label="Enter Password"
        value={password}
        onChange={onChange}
        margin="normal"
      />
    }

}

export default PasswordInput;