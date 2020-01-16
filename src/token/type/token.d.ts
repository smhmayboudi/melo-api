export interface Token {
  create_session_date: Date;
  expiration_date: Date;
  id: number;
  last_request_date: Date;
  user_id: number;
  token: string;
}
