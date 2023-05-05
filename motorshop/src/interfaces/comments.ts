import { IUserWithoutAddress } from "./users";

export interface ICreateCommentData {
  comment: string;
}

export interface IComment {
  id: string;
  comment: string;
  createdAt: string;
  user: IUserWithoutAddress;
}
