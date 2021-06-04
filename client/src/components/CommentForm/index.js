import React, { useRef, useContext } from "react";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext";
import "./style.css"

function CommentForm({ searchValue, stockName, getComments, commentList }) {
  console.log("this is the stockName", stockName);
  const input = useRef();
  // const [commentList, setCommentList] = useState([]);

  console.log("The hills are a live with the sound of music");
  console.log(searchValue);

  const [user] = useContext(UserContext);

  return (
    <div id="commentSection">
      <div id="comment-list">
        <p id="comment-header">Comments:</p>
        <table>
          {/* <thead>
          <tr>
            <th></th>
            <th>UserName</th>
            <th>Comments</th>
          </tr>
        </thead> */}
          <tbody id="commentTable">
            {commentList.map((stock, i) => {
              console.log(stock);
              return (
                <tr key={i} className="comments">
                  <td class>{stock.username} says:</td>
                  <td>{stock.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="commentForm">
        <textarea type="text" placeholder="Comment" ref={input}></textarea>
        <button
          id="commentbtn"
          className="btn"
          onClick={(e) => {
            API.addComment({
              comments: input.current.value,
              username: user.username,
              stock: searchValue,
            });
            input.current.value = "";
            getComments(searchValue);
          }}
        >
          Add Comment
      </button>
      </div>
    </div>
  );
}

export default CommentForm;
