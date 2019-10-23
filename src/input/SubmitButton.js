import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

class SubmitButton extends Component {
    render() {
      const {onClick} = this.props;
        return (
            <Button variant="contained" color="primary" onClick={onClick}>
            Submit
          </Button>
        )
    }
}

export default SubmitButton


