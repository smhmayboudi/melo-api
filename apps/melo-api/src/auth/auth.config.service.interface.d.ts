export interface AuthConfigServiceInterface {
  jwtAccessTokenExpiresCount: number;
  jwtAccessTokenExpiresIn: number;
  jwtAuhSchema: string;
  telegramBotToken: string;
  telegramQueryExpiration: number;
}
