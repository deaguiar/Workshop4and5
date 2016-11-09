import React from 'react';
import {unixTimeToString} from '../utils.js'
import {Link} from 'react-router';
import {likeFeedItemComment,unlikeFeedItemComment} from '../server';


export default class Comment extends React.Component {
  constructor(props){
    super(props);
     this.state = props.data
  }
  handleLikeClick(clickEvent) {
   clickEvent.preventDefault();

   if(clickEvent.button === 0){
     var callbackFunction = (updatedLikeCounter) => {
       this.setState({likeCounter: updatedLikeCounter});
     };
     if(this.didUserLike()) {
       // User clicked 'unlike' button.
       unlikeFeedItemComment(this.props.index,this.props.stateId, 4, callbackFunction);
     }
     else {
       // User clicked 'like' button.
       likeFeedItemComment(this.props.index,this.props.stateId,4,callbackFunction);
     }
   }
 }
 didUserLike() {
 var likeCounter = this.state.likeCounter;
 var liked = false;
 for (var i = 0; i < likeCounter.length; i++) {
 if (likeCounter[i]._id === 4) {
 liked = true;
 break;
 }
 }
 return liked;
 }
 render() {
   return (
    <div>
    <div className="media-left media-top">
    PIC
    </div>
    <div className="media-body">
      <Link to={"/profile/" + this.props.author._id}>
  {this.props.author.fullName}
  </Link> {this.props.children}
    <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}> {this.state.postLikes.length} Likes </a> · <a href="#">Reply</a> ·
    {unixTimeToString(this.props.postDate)}
    </div>
    </div>
    )
  }
}
