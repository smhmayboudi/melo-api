import { Gender } from "./Gender";

export interface User {
  avatar: string | null;
  biography: string | null;
  birthday: Date | null;
  cellphone: string;
  email: string;
  firstname: string;
  gender: Gender | null;
  id: number;
  language_code: string;
  lastname: string;
  registered_date: Date;
  telegram_id: number;
  username: string;
}
