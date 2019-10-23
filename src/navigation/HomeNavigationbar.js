import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class NavigationBar extends React.Component{
    render(){
        return (
            <AppBar position="static">
                <Toolbar >
                    <Typography variant={"h6"} >
                        BookFace
                    </Typography>
                    <div className="nav-container" >
                    <Button color={"inherit"} onClick={() => this.props.history.push('/login')}>Login</Button>
                    <Button color={"inherit"} onClick={() => this.props.history.push('/register')}>Register</Button>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
} 

export default withRouter(NavigationBar);