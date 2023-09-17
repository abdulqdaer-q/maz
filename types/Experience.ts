import { Response } from "./Response";

export interface Experience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  isCurrentRole: boolean;
  endDate: string | null;
  id: string;
}

export type Experiences = Response<Experience>;
