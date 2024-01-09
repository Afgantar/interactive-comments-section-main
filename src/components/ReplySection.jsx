import React, { useState } from "react";
import { useComment } from "../context/CommentContext";

const ReplySection = ({ type, target, parent, parentFunc }) => {
  const { user, comments, setComments } = useComment();
  const [reply, setReply] = useState("");

  function sendHandler() {
    if (type === "REPLY") {
      if (!reply) return;
      const temp = {
        id: new Date(),
        content: reply,
        createdAt: new Date().toISOString().slice(0, 10),
        score: 0,
        replyingTo: target,
        user: {
          image: user.image,
          username: user.username,
        },
      };
      if (parent === "none") {
        setComments((prev) => {
          return prev.map((comment) =>
            comment.user.username === target
              ? { ...comment, replies: [...comment.replies, temp] }
              : comment
          );
        });
      } else {
        setComments((prev) => {
          return prev.map((comment) =>
            comment.user.username === parent
              ? { ...comment, replies: [...comment.replies, temp] }
              : comment
          );
        });
      }

      setReply("");
      const dataToParent = false;
      parentFunc(dataToParent);
    }
    if (type === "SEND") {
      if (!reply) return;
      const temp = {
        id: new Date(),
        content: reply,
        createdAt: new Date().toISOString().slice(0, 10),
        score: 0,
        user: {
          image: user.image,
          username: user.username,
        },
        replies: [],
      };

      setComments((prev) => {
        return [...prev, temp];
      });

      setReply("");
    }
  }

  function changeHandler(e) {
    setReply(e.target.value);
  }

  return (
    <div className="w-full flex flex-col medium-device:flex-row items-start bg-white p-[25px] rounded-[10px] gap-[20px] animate-summon">
      {user.image.webp !== undefined && (
        <img
          src={user.image.webp.substring(1)}
          alt=""
          className="w-[6%] aspect-square rounded-full medium-device:block hidden"
        />
      )}
      <textarea
        placeholder="Add a comment..."
        className="medium-device:grow w-full medium-device:w-auto outline-none border-light-grayish-blue border-[1px] rounded-[8px] px-[20px] py-[7px] resize-none h-[90px] hover:border-moderate-blue focus:border-moderate-blue transition-all ease-in-out duration-200"
        value={reply}
        onChange={changeHandler}
      ></textarea>
      <button
        onClick={sendHandler}
        className="text-white bg-moderate-blue px-[20px] py-[7px] rounded-[5px] hover:bg-light-grayish-blue medium-device:block hidden transition-all ease-in-out duration-200"
      >
        {type}
      </button>
      <div className="flex justify-between items-center medium-device:hidden w-full">
        {user.image.webp !== undefined && (
          <img
            src={user.image.webp.substring(1)}
            alt=""
            className="w-[10%] aspect-square rounded-full medium-device:hidden block"
          />
        )}
        <button
          onClick={sendHandler}
          className="text-white bg-moderate-blue px-[20px] py-[7px] rounded-[5px] hover:bg-light-grayish-blue medium-device:hidden block transition-all ease-in-out duration-200"
        >
          {type}
        </button>
      </div>
    </div>
  );
};

export default ReplySection;
