import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class DislikeButton extends Component {
    render() {
        const {onClick} = this.props;
        return (
            <Button variant="contained" color="primary" size="small" onClick={onClick}>
            Dislike
          </Button>
        )
    }
}

export default DislikeButton
