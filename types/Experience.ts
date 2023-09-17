import { Country } from "./Country";
import { Industry } from "./Industry";
import { Response } from "./Response";

export interface Experience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  isCurrentRole: boolean;
  endDate: string | null;
  jobLocation: Country;
  companyIndustry: Industry;
  id: number;
}

export type Experiences = Response<Experience>;
