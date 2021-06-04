import React, { useRef, useContext } from "react";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext";

function CommentForm({ searchValue, stockName, getComments, commentList }) {
  console.log("this is the stockName", stockName);
  const input = useRef();
  // const [commentList, setCommentList] = useState([]);

  console.log("The hills are a live with the sound of music");
  console.log(searchValue);

  const [user] = useContext(UserContext);

  return (
    <div>
      <table id="comment-list">
        {/* <thead>
          <tr>
            <th></th>
            <th>UserName</th>
            <th>Comments</th>
          </tr>
        </thead> */}
        <tbody>
          {commentList.map((stock, i) => {
            console.log(stock);
            return (
              <tr key={i}>
                <td>{stock.username} says:</td>
                <td>{stock.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <input type="text" placeholder="Comment" ref={input}></input>
      <button
        className="ml-3 btn btn-primary"
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
      {/* <button onClick={(getAllComments)}>Get Comments</button>  */}
    </div>
  );
}

export default CommentForm;
