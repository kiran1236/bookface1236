import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LikeButton from '../input/LikeButton';
import DislikeButton from '../input/DislikeButton';
import localstorage from 'local-storage';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const useStyles = makeStyles({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        maxwidth: 30,
      },
      content: {
        padding: 25,
        objectFit: 'cover'
      }
});

const divStyle = {
marginBottom: 10
};

class Posts extends Component {

    constructor(props) {
        super(props);
        this.createPosts = this.createPosts.bind(this);
        this.likePost = this.likePost.bind(this);
        this.dislikePost = this.dislikePost.bind(this);
        this.state = {
          snackbaropen: false,
          snackbarmsg: ''
      };
    }

    likePost(id, event) 
    {
      const userPosts = localstorage.get("posts");
      const likesAndDislikes = localstorage.get("likesAndDislikes");
      const currentUser = localstorage.get("currentUser");
      let alreadyLiked = 0;
      let sameUser=0;
      userPosts.forEach((userPost) => 
      {
        if(userPost["postId"]===id)
        {
          if(userPost["email"] === currentUser["emailAddress"])
          {
            sameUser=1;
          }
        }
      });



      if(sameUser === 0 ){
      likesAndDislikes.forEach((likeAndDislike) => 
      {
        console.log(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"]);
        console.log(likeAndDislike["postId"]);
        console.log(id);
        console.log(likeAndDislike["email"]);
        console.log(currentUser["emailAddress"]);
        if(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"])
        {
          if(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"] && likeAndDislike["likes"] > 0)
          {
            alreadyLiked=1;
            console.log("You have already liked the post");
            this.setState({snackbaropen:true, snackbarmsg:"You have already liked the post"});
          }
          else if(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"] && likeAndDislike["dislikes"] > 0)
          {
            alreadyLiked=1;
            console.log("last else1111");
            likeAndDislike["dislikes"]=0;
            likeAndDislike["likes"]=1;
            userPosts.forEach((userPost) => 
            {
              if(userPost["postId"]===id)
              {
                userPost["likes"]=userPost["likes"]+1;
                userPost["dislikes"]=userPost["dislikes"]-1;
              }
            });
          } 
        }  
        
      });
    
      if(alreadyLiked === 0)
        {
          console.log("last else");
          userPosts.forEach((userPost) => 
          {
            if(userPost["postId"]===id)
            {
              userPost["likes"]=userPost["likes"]+1;
              const likeAndDislike = {postId:id, email:currentUser["emailAddress"], likes:1, dislikes:0};
              likesAndDislikes.push(likeAndDislike);
            }
          });
        }     
        console.log(likesAndDislikes);
        localstorage.set("posts",userPosts);
        localstorage.set("likesAndDislikes",likesAndDislikes);
        this.forceUpdate();
      }
      else {
        console.log("You are not allowed to like your own posts");
        this.setState({snackbaropen:true, snackbarmsg:"You are not allowed to like your own posts"});
      }
    }

    snackbarClose = (event) => {
      this.setState({snackbaropen:false});
  }

    dislikePost(id, event) {


      const userPosts = localstorage.get("posts");
      const likesAndDislikes = localstorage.get("likesAndDislikes");
      const currentUser = localstorage.get("currentUser");
      let alreadyDisliked = 0;
      let sameUser=0;
      userPosts.forEach((userPost) => 
      {
        if(userPost["postId"]===id)
        {
          if(userPost["email"] === currentUser["emailAddress"])
          {
            sameUser=1;
          }
        }
      });



      if(sameUser === 0 ){

      likesAndDislikes.forEach((likeAndDislike) => 
      {
        console.log(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"]);
        console.log(likeAndDislike["postId"]);
        console.log(id);
        console.log(likeAndDislike["email"]);
        console.log(currentUser["emailAddress"]);
        if(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"])
        {
          if(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"] && likeAndDislike["dislikes"] > 0)
          {
            alreadyDisliked=1;
            console.log("You have already disliked the post");
            this.setState({snackbaropen:true, snackbarmsg:"You have already disliked the post"});
          }
          else if(likeAndDislike["postId"]===id && likeAndDislike["email"]=== currentUser["emailAddress"] && likeAndDislike["likes"] > 0)
          {
            alreadyDisliked=1;
            console.log("last else1111");
            likeAndDislike["dislikes"]=1;
            likeAndDislike["likes"]=0;
            userPosts.forEach((userPost) => 
            {
              if(userPost["postId"]===id)
              {
                userPost["likes"]=userPost["likes"]-1;
                userPost["dislikes"]=userPost["dislikes"]+1;
              }
            });
          } 
        }  
        
      });
      if(alreadyDisliked === 0)
        {
          console.log("last else");
          userPosts.forEach((userPost) => 
          {
            if(userPost["postId"]===id)
            {
              userPost["dislikes"]=userPost["dislikes"]+1;
              const likeAndDislike = {postId:id, email:currentUser["emailAddress"], likes:0, dislikes:1};
              likesAndDislikes.push(likeAndDislike);
            }
          });
        }     
      console.log(likesAndDislikes);
      localstorage.set("posts",userPosts);
      localstorage.set("likesAndDislikes",likesAndDislikes);
      this.forceUpdate();
    }
    else {
      console.log("You are not allowed to dislike your own posts");
      this.setState({snackbaropen:true, snackbarmsg:"You are not allowed to dislike your own posts"});
    }
  }
    createPosts(){
        const posts=[];
        const classes = this.props;
        const userPosts = localstorage.get("posts");
        //console.log("The user posts are : ");
        //console.log(userPosts);
        userPosts.forEach((userPost) => {
            posts.push(<div key = {userPost["postId"]} style={divStyle}> <Card className={classes.card}>
                <CardContent className={classes.content}>
                  <Typography
                    variant="h5"
                    color="primary"
                  >
                    {userPost["postMessage"]}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    By : {userPost["name"]}
                  </Typography>
                  <br />
                  <LikeButton key = {"like"+userPost["postId"]}  onClick={this.likePost.bind(this,userPost["postId"])} /> <DislikeButton key = {"dislike"+userPost["postId"]} onClick={this.dislikePost.bind(this,userPost["postId"])}/>
                  <Typography variant="body2" color="textSecondary">
                  {userPost["likes"]} Likes {userPost["dislikes"]} Dislikes
                  </Typography>
                  
                </CardContent>
               </Card>
               </div>


                
            );
        });
        return posts;
}

    render() {
        
        return (
            <div>
               {this.createPosts()} 
               <Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {2000} onClose={this.snackbarClose}
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ]}/>
        </div>
        )
    }
}

export default withStyles(useStyles)(Posts);
