import React, { Component } from 'react';
import '../App.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export class PostTextArea extends Component {
    render() {

        const {text, onChange} = this.props;
        
        return (
            <div className="newpost">
            <TextareaAutosize aria-label="minimum height" rows={3} placeholder="Minimum 3 rows" value={text} onChange={onChange}
        />
            </div>
        )
    }
}

export default PostTextArea
