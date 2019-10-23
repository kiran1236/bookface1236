import React, { Component } from 'react';
import localstorage from 'local-storage';
import Typography from '@material-ui/core/Typography';

export class ProfilePage extends Component {
    render() {
        const currentUser=localstorage.get("currentUser");
        
        const { name, emailAddress} = currentUser;
        //const name = "asdf";
        //const emailAddress = "asdfasdf";
        return (
            <div>
                <Typography variant={"h4"}>
                    User Profile
                    </Typography>
                    <br />
                <Typography variant={"h5"}>
                    Full name : {name}
                    <br />
                    Email Address : {emailAddress}
                    </Typography>
            </div>
        )
    }
}

export default ProfilePage
