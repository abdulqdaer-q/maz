export interface Education {
  degree: Degree;
  description?: string;
  feildOfStudy: string;
  garde?: number;
  graduationDate: string;
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
