import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export class NewPostButton extends Component {
    render() {
        const {onClick} = this.props;
        return (
            <Button variant="contained" color="primary"  onClick={onClick}>
            New Post
          </Button>
        )
    }
}

export default NewPostButton
