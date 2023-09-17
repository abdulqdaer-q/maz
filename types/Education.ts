import { Country } from "./Country";

export interface Education {
  degree: Degree;
  description?: string;
  feildOfStudy: string;
  garde?: number;
  graduationDate: string;
  university: string;
  country?: Country;
  id: number;
}

export enum Degree {
  HIGH_SCOOL = "High School",
  DIPLOMA = "Diploma",
  BACHELOR = "Bachelor's",
  HIGHER_DIPLOMA = "Higher Diploma",
  MASTER = "Master's",
  DOCTORATE = "Doctorate",
}
