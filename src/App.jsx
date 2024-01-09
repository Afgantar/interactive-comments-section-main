import React, { useEffect } from "react";
import MainApplication from "./components/MainApplication";
import { useComment } from "./context/CommentContext";

const App = () => {
  const {delComm, setDelComm, comments, setComments} = useComment();

  function cancelHandler() {
    setDelComm({
      status: false,
      parent: "",
      comments: "",
    })
  }

  function deleteHandler() {
    if (delComm.parent === "none") {
      const tempComments = comments.filter((comment) => comment.content !== delComm.comments);
      setComments(tempComments);
      cancelHandler();
    }
    else {
      const tempObject = comments.find((comment) => comment.user.username === delComm.parent);
      const tempReplies = tempObject.replies.filter((reply) => reply.content !== delComm.comments);
      setComments(prev => {
        return prev.map(comment => comment.user.username === delComm.parent ? {...comment, replies: tempReplies} : comment)
      })
      cancelHandler();
    }
  }

  return (
    <div className="w-full min-h-screen bg-very-light-gray flex justify-center">
      <MainApplication />
      {delComm.status && (<div className="absolute top-0 bottom-0 right-0 left-0 bg-black/30 flex justify-center items-center backdrop-blur-[5px]">
        <div className="bg-white w-[90%] mobile:w-[70%] medium-device:w-[45%] laptop:w-[28%] flex flex-col justify-center p-[30px] gap-[20px] rounded-[10px] animate-summon">
          <h1 className="font-bold text-[25px] text-dark-blue">Delete comment</h1>
          <p className="text-grayish-blue">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="flex justify-between items-center w-full gap-[20px]">
            <button onClick={cancelHandler} className="flex-1 text-white bg-grayish-blue leading-none py-[15px] rounded-[10px] transition-all ease-in-out duration-200 hover:opacity-50">NO, CANCEL</button>
            <button onClick={deleteHandler} className="flex-1 text-white bg-soft-red leading-none py-[15px] rounded-[10px] transition-all ease-in-out duration-200 hover:opacity-50">YES, DELETE</button>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default App;
