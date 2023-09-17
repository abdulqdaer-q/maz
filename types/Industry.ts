import { Response } from "./Response";
export interface Industry {
  title: string;
  id: string;
}

export type Industries = Response<Industry>;
