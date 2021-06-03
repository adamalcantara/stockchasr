import React, {useRef, useContext, useState, useEffect } from "react";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext"


function CommentForm({ searchValue }) {
    const input = useRef()
    const [commentList, setCommentList] = useState([]);

    console.log("The hills are a live with the sound of music")
    console.log(searchValue)

    const [user, dispatch] = useContext(UserContext);
    
    React.useEffect(() => getAllComments(), [])

    function getAllComments () {
        console.log("Alligators cant get aids")
        API.getComment({searchValue}).then((res) => {
            console.log(res.data);
            var commentList = [];
            console.log("This is from the get all comments function");
            console.log(commentList);
            // for (var i = 0; i < res.data.length; i++) {
            //     commentList.push({
            //       username: res.data[i],
            //       comment: res.data[i],
            //     });
            //   }
              setCommentList(commentList)
        })
    }
    // getAllComments();

    return (
        <div>
            <input type="text" placeholder="Comment" ref={input}></input>
            <button className="ml-3 btn btn-primary" onClick={(e) => API.addComment({
                comments: input.current.value,
                username: user.username,
                stock: searchValue
                })}>Add Comment</button>
                {/* <button onClick={(getAllComments)}>Get Comments</button>  */}
        
            <table id="comment-list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>UserName</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {getAllComments.map((stock) => {
                            console.log(stock)
                            return (
                                <tr>
                                    <td>
                                    {getAllComments.username}
                                    </td>
                                    <td>
                                    {getAllComments.comment}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody> */}
                </table>
        </div>
                

    )
}


export default CommentForm 