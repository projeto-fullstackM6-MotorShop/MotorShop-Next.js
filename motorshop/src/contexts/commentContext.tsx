import { createContext, useContext, useState } from "react";
import { IChildren } from "@/interfaces/misc";
import { useAuth } from "./authContext";
import { IComment, ICreateCommentData } from "@/interfaces/comments";
import { api } from "@/services/api";

interface CommentProviderData {
  createComment: (data: ICreateCommentData, annoucementId: string) => void;
  getAllCommentsOfAnnoucement: (annoucementId: string) => void;
  deleteComment: (commentId: string, annoucementId: string) => void;
  updateComment: (
    data: ICreateCommentData,
    commentId: string,
    annoucementId: string
  ) => void;
  commentsOfAnnoucement: IComment[];
}

export const CommentContext = createContext<CommentProviderData>(
  {} as CommentProviderData
);

export const CommentProvider = ({ children }: IChildren) => {
  const [commentsOfAnnoucement, setCommentsOfAnnoucement] = useState<
    IComment[]
  >([]);

  const { token } = useAuth();

  const createComment = async (
    data: ICreateCommentData,
    annoucementId: string
  ) => {
    try {
      await api.post(`/comment/${annoucementId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAllCommentsOfAnnoucement(annoucementId);
    } catch (error: any) {
      console.error(error);
    }
  };

  const getAllCommentsOfAnnoucement = async (annoucementId: string) => {
    try {
      const response = await api.get(`/comment/${annoucementId}`);

      setCommentsOfAnnoucement(response.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const deleteComment = async (commentId: string, annoucementId: string) => {
    try {
      await api.delete(`/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAllCommentsOfAnnoucement(annoucementId);
    } catch (error: any) {
      console.error(error);
    }
  };

  const updateComment = async (
    data: ICreateCommentData,
    commentId: string,
    annoucementId: string
  ) => {
    try {
      await api.patch(`/comment/${commentId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAllCommentsOfAnnoucement(annoucementId);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        createComment,
        getAllCommentsOfAnnoucement,
        deleteComment,
        updateComment,
        commentsOfAnnoucement,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => useContext(CommentContext);
