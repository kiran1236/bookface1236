import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export class LogoutButton extends Component {
    render() {
        const {onClick} = this.props;
          return (
              <Button variant="contained" color="primary" onClick={onClick}>
              Logout
            </Button>
          )
      }
}
export default LogoutButton
