import React, { createContext, useContext, useEffect, useState } from "react";
import Data from "../utils/data.json";

const CommentContext = createContext();

export function useComment() {
  return useContext(CommentContext);
}

export function CommentProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    image: {},
  });
  const [comments, setComments] = useState([]);
  const [delComm, setDelComm] = useState({
    status: false,
    parent: "",
    comments: "",
  });

  useEffect(() => {
    const localComments = localStorage.getItem("comments");
    const localUser = localStorage.getItem("current_user");

    if (localComments) {
      setComments(JSON.parse(localComments));
    } else {
      setComments(Data.comments);
    }

    if (localUser) {
      const temp = JSON.parse(localUser);
      setUser({
        username: temp.username,
        image: temp.image,
      });
    } else {
      setUser({
        username: Data.currentUser.username,
        image: Data.currentUser.image,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("current_user", JSON.stringify(user));
  }, [user]);

  return (
    <CommentContext.Provider
      value={{ user, comments, delComm, setDelComm, setComments }}
    >
      {children}
    </CommentContext.Provider>
  );
}
