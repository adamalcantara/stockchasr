import React, { useRef, useContext, useState, useEffect } from "react";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext";

function CommentForm({ searchValue }) {
  const input = useRef();
  const [commentList, setCommentList] = useState([]);

  console.log("The hills are a live with the sound of music");
  console.log(searchValue);

  const [user, dispatch] = useContext(UserContext);

  React.useEffect(() => getAllComments(), []);

  function getAllComments() {
    console.log("Alligators cant get aids");
    API.getComment({ searchValue }).then((res) => {
      console.log(res.data);
      var commentListArr = [];
      console.log("This is from the get all comments function");
      console.log(commentListArr);
      for (var i = 0; i < res.data.length; i++) {
        commentListArr.push({
          username: res.data[i].username,
          comment: res.data[i].comments,
        });
      }
      setCommentList(commentListArr);
    });
  }
  // getAllComments();

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
              <tr>
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
        onClick={(e) =>
          API.addComment({
            comments: input.current.value,
            username: user.username,
            stock: searchValue,
          })
        }
      >
        Add Comment
      </button>
      {/* <button onClick={(getAllComments)}>Get Comments</button>  */}
    </div>
  );
}

export default CommentForm;
