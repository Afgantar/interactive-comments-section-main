import React from "react";
import { useComment } from "../context/CommentContext";
import CommentComplex from "./CommentComplex";

const CommentsContainer = () => {
  const { comments } = useComment();

  return (
    <div className="w-full flex flex-col items-center overflow-y-scroll grow gap-[10px]">
      {comments.map((comment) => (
        <CommentComplex key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentsContainer;
