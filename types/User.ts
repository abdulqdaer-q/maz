import { StrapiPhoto } from "@/utils/helper";

export interface UserInfo {
  birthDate: string;
  createdAt: string;
  id: number;
  locale: string;
  name: string;
  nationalID: string;
  phoneNumber: string;
  publishedAt: string;
  sex: string;
  updatedAt: string;
  photo: StrapiPhoto
  bio: string;
}

export interface User {
  blocked: boolean;
  username: string;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  user_info: UserInfo;
}
