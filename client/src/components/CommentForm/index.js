import React, {useRef, useContext } from "react";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext"


function CommentForm({ searchValue }) {
    const input = useRef()

    console.log("The hills are a live with the sound of music")
    console.log(searchValue)

    const [user, dispatch] = useContext(UserContext);


    return (
        <div>
            <input type="text" placeholder="Comment" ref={input}></input>
            <button className="ml-3 btn btn-primary" onClick={(e) => API.addComment({
                comments: input.current.value,
                username: user.username,
                stock: searchValue
                })}>Add Comment</button>
                <button onClick={(e) => API.getComment({searchValue})}>Get Comments</button>
        </div>
    )
}

export default CommentForm 