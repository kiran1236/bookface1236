import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class LikeButton extends Component {
    render() {
        const {onClick} = this.props;
        return (
            <Button variant="contained" color="primary" size="small" onClick={onClick}>
            Like
          </Button>
        )
    }
}

export default LikeButton
