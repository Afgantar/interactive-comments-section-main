import React, { useEffect, useState } from "react";
import ReplyIcon from "/images/icon-reply.svg";
import EditIcon from "/images/icon-edit.svg";
import DeleteIcon from "/images/icon-delete.svg";
import ReplySection from "./ReplySection";
import { useComment } from "../context/CommentContext";

const CommentCard = ({ data, parent }) => {
  const { user, comments, setComments, setDelComm } = useComment();
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editedReply, setEditedReply] = useState(data.content);

  function toggleReply() {
    setOpenReply((prev) => !prev);
  }

  function deleteCommentHandler() {
    setDelComm({
      status: true,
      parent: parent,
      comments: data.content,
    });
  }

  function handleDataFromChild(data) {
    setOpenReply(data);
  }

  function editCommentHandler() {
    setOpenEdit((prev) => !prev);
  }

  function updateHandler() {
    if (!editedReply) return;
    if (parent === "none") {
      setComments((prev) => {
        return prev.map((comment) =>
          comment.user.username === data.user.username
            ? { ...comment, content: editedReply }
            : comment
        );
      });
    } else {
      const tempObject = comments.find(
        (comment) => comment.user.username === parent
      );
      const newArray = tempObject.replies.map((reply) => {
        return reply.user.username === data.user.username
          ? { ...reply, content: editedReply }
          : reply;
      });
      setComments((prev) => {
        return prev.map((comment) =>
          comment.user.username === parent
            ? { ...comment, replies: newArray }
            : comment
        );
      });
    }
    setOpenEdit(false);
  }

  return (
    <div className="flex flex-col gap-[10px] w-full animate-slideRight">
      <div className="w-full">
        <div className="w-full flex flex-col medium-device:flex-row bg-white p-[25px] rounded-[10px] gap-[20px] items-start">
          <div className="flex items-center justify-between min-w-full medium-device:min-w-[5%] order-2 medium-device:order-none">
            <div className="flex flex-row medium-device:flex-col justify-center items-center medium-device:w-full px-[10px] medium-device:px-0 bg-very-light-gray rounded-[10px] medium-device:gap-[5px] gap-[15px] py-[7px] medium-device:py-0">
              <button className="text-light-grayish-blue font-bold">+</button>
              <p className="font-medium text-moderate-blue">{data.score}</p>
              <button className="text-light-grayish-blue font-bold">-</button>
            </div>
            {data.user.username === user.username ? (
              <div className="flex items-center gap-[20px] medium-device:hidden">
                <button
                  onClick={deleteCommentHandler}
                  className="flex items-center gap-[10px] hover:opacity-50 transition-all ease-in-out duration-200"
                >
                  <img src={DeleteIcon} alt="" />
                  <p className="font-medium text-soft-red">Delete</p>
                </button>
                <button
                  onClick={editCommentHandler}
                  className="flex items-center gap-[10px] hover:opacity-50 transition-all ease-in-out duration-200"
                >
                  <img src={EditIcon} alt="" />
                  <p className="font-medium text-moderate-blue">Edit</p>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={toggleReply}
                  className="flex items-center gap-[10px] hover:opacity-50 medium-device:hidden transition-all ease-in-out duration-200"
                >
                  <img src={ReplyIcon} alt="" />
                  <p className="font-medium text-moderate-blue">Reply</p>
                </button>
              </>
            )}
          </div>
          <div className="grow flex flex-col gap-[10px] justify-center items-center">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-[15px]">
                <img
                  src={data.user.image.webp.substring(1)}
                  alt=""
                  className="w-[10%] aspect-square rounded-full"
                />
                <p className="font-medium">{data.user.username}</p>
                {data.user.username === user.username && (
                  <div className="bg-moderate-blue text-white text-[13px] px-[7px] leading-none py-[3px] rounded-[3px]">
                    you
                  </div>
                )}
                <p className="text-grayish-blue">{data.createdAt}</p>
              </div>
              {data.user.username === user.username ? (
                <div className="medium-device:flex items-center gap-[20px] hidden">
                  <button
                    onClick={deleteCommentHandler}
                    className="flex items-center gap-[10px] hover:opacity-50 transition-all ease-in-out duration-200"
                  >
                    <img src={DeleteIcon} alt="" />
                    <p className="font-medium text-soft-red">Delete</p>
                  </button>
                  <button
                    onClick={editCommentHandler}
                    className="flex items-center gap-[10px] hover:opacity-50 transition-all ease-in-out duration-200"
                  >
                    <img src={EditIcon} alt="" />
                    <p className="font-medium text-moderate-blue">Edit</p>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={toggleReply}
                    className="medium-device:flex items-center gap-[10px] hover:opacity-50 hidden transition-all ease-in-out duration-200"
                  >
                    <img src={ReplyIcon} alt="" />
                    <p className="font-medium text-moderate-blue">Reply</p>
                  </button>
                </>
              )}
            </div>
            {openEdit ? (
              <div className="w-full flex flex-col gap-[10px]">
                <textarea
                  placeholder="Edit comment..."
                  className="outline-none border-light-grayish-blue border-[1px] rounded-[8px] px-[20px] py-[7px] resize-none h-[120px] w-full hover:border-moderate-blue focus:border-moderate-blue transition-all ease-in-out duration-200"
                  value={editedReply}
                  onChange={(e) => {
                    setEditedReply(e.target.value);
                  }}
                ></textarea>
                <button
                  onClick={updateHandler}
                  className="text-white bg-moderate-blue px-[20px] py-[7px] rounded-[5px] hover:bg-light-grayish-blue self-end transition-all ease-in-out duration-200"
                >
                  UPDATE
                </button>
              </div>
            ) : (
              <div className="break-words w-full box-border text-grayish-blue">
                {data.replyingTo !== undefined ? (
                  <span className="font-bold text-moderate-blue">
                    @{data.replyingTo}{" "}
                  </span>
                ) : (
                  ""
                )}
                {data.content}
              </div>
            )}
          </div>
        </div>
      </div>
      {openReply && (
        <div>
          <ReplySection
            type="REPLY"
            target={data.user.username}
            parent={parent}
            parentFunc={handleDataFromChild}
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
