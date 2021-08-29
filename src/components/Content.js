import React from 'react';

const Content = (props) => {
    
    return(
                <div className="post">
                    <div className="postImage"><img src={props.data.titleImg} /></div>
                    <div className="postTitle">{props.data.title}</div>
                    <div className="postInfo">
                        <div className="postCreator">{props.data.creator}</div>
                        <div className="postCreatedAt">{props.data.created_at}</div>
                    </div>
                    <div className="postContent">{props.data.content.substring(0,10)+"..."}<div className="postShowMore">Show More</div></div>

                </div>  
    )
}

export default Content;