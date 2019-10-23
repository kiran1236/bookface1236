import React from 'react';
import TextField from '@material-ui/core/TextField';

class NameInput extends React.Component{
    render(){
        const {name, onChange} = this.props;
        return  <TextField
        id="standard-name"
        label="Enter Full Name"
        value={name}
        onChange={onChange}
        margin="normal"
      />
    }

}

export default NameInput;