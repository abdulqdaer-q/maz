import { Response } from "./Response";

export enum Level {
    BEGGINER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced'
}
export interface Speciality {
    name: string;
    level: Level;
    id: number;
}
export type Specialities = Response<Speciality>

export interface Skill {
    name: string;
    id: number;
}
export type Skills = Response<Skill>

export enum Language  {
    ARABIC= 'Arabic',
    ENGLISH= 'English',
    FRENCH ='French'
}

export type LanguageLevel = {
    language: Language
    level: Level;
    id: number;
}
export type Languages = Response<LanguageLevel>;