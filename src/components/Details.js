import React from 'react';
import back from './img/back.png'; 
const Details = (props) => {
    
    return(
        <div>
            <div onClick={()=>{props.removeSelected()}} className="back">
                <img src={back} />
        </div>
                <div className="detail">
                    <div className="detailImage"><img src={props.data.titleImg} /></div>
                    <div className="detailTitle">{props.data.title}</div>
                    <div className="detailInfo">
                        <div className="detailCreator">{props.data.creator}</div>
                        <div className="detailCreatedAt">{props.data.created_at}</div>
                    </div>
                    <div className="detailDescription">
                    <div className="detailContent">{props.data.content}</div>
                    </div>
                </div>  
        </div>
    )
}

export default Details;