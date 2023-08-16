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
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  user_info: UserInfo;
}
