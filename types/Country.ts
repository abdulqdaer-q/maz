import { Response } from "./Response";
export interface Country {
  name: string;
  id: string;
}

export type Countries = Response<Country>;
