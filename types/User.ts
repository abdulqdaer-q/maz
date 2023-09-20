import { Country } from "./Country";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Languages, Skills, Specialities } from "./Specaility";

export interface Photo {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  previewUrl: string | null;
  provider: string;
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  Unspecified = "Gender Unspecified "
}

export interface Nationality extends Country { }
export interface ResidenceCountry extends Country { }

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  birthday: string;
  gender: Gender;
  photo: Photo;
  residenceCountry: ResidenceCountry;
  nationality: Nationality;
  educations?: Education[];
  experiences?: Experience[];
  cv?: Photo;
  user?: {
    id: number;
  };
  specialities?: Specialities;
  skills?: Skills;
  languages?: Languages;
}

export interface Company { }

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  userInfo?: UserInfo;
  company?: Company;
}
