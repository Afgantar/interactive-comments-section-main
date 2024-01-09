import React from "react";
import CommentCard from "./CommentCard";
import ReplySection from "./ReplySection";

const CommentComplex = ({ data }) => {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <CommentCard data={data} parent={`none`} />
      {data.replies.length !== 0 && (
        <div className="flex gap-[10px] mobile:gap-0">
          <div className="mobile:min-w-[10%] flex justify-center">
            <div className="w-[2px] bg-light-grayish-blue"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[10px] grow">
            {data.replies.map((reply) => (
              <CommentCard key={reply.id} data={reply} parent={data.user.username} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentComplex;
