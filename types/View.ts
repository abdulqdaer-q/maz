import { Response } from "./Response";
import { User, UserInfo } from "./User";

export interface View {
  userInfo: UserInfo;
  visitedUser: UserInfo;
  updatedAt: string;
  id: number;
}
export type Views = Response<View>;
