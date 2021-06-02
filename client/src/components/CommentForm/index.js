import React, {useRef, useContext} from "react";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext"


function CommentForm({ searchValue }) {
    const input = useRef()

    const [user, dispatch] = useContext(UserContext);


    return (
        <div>
            <input type="text" placeholder="Comment" ref={input}></input>
            <button className="ml-3 btn btn-primary" onClick={(e) => API.addComment({
                comments: input.current.value,
                username: user.username,
                symbol: searchValue
                })}>Add Comment</button>
        </div>
    )
}

export default CommentForm 