import { Country } from "./Country";
import { Industry } from "./Industry";
import { Response } from "./Response";
import { Company } from "./Company";

export enum EmploymentType {
  FULL_TIME = "Full Time",
  PARt_TIME = "Part Time",
  CONCTRACTOR = "Contractor",
  TEMPORARY = "Temporary",
  INTERNSHIPT = "Internship",
}

export interface Job {
  title: string;
  id: number;
  industries: Industry;
  country: Country;
  minimumSalary: number;
  maximumSalary: number;
  numberOfVacancies: number;
  employmentType: EmploymentType;
  isWorkFromHome: boolean;
  jobDescription: string;
  desiredSkills: string;
  minimumAge: number;
  maximumAge: number;
  minimumYearsOfExperience: number;
  company: Company;
}
export type Jobs = Response<Job>;