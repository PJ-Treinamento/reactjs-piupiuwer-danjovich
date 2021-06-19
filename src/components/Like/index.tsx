import React, { Component } from "react";

import like from '../../assets/images/like.svg';
import liked from '../../assets/images/liked.svg';

class Like extends Component {
    state = { liked: false };
    toggle = () => {
        let localLiked = this.state.liked;

        // Toggle the state variable liked
        localLiked = !localLiked;
        this.setState({ liked: localLiked });
    };
    render() {
        return (
            <img onClick={() => this.toggle()} src={this.state.liked ? liked : like} alt="Like" className="like" />
        );
    }
}

export default Like;