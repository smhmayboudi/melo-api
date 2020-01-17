export interface Rt {
  create_at: Date;
  description: string;
  expire_at: Date;
  id: number;
  is_blocked: boolean;
  user_id: number;
  token: string;
}
