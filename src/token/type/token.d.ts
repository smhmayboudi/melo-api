export interface Token {
  create_session_date: Date;
  description: string;
  expiration_date: Date;
  id: number;
  is_blocked: boolean;
  last_request_date: Date;
  user_id: number;
  token: string;
}
