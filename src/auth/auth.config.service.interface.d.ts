export interface AuthConfigServiceInterface {
  jwtAccessTokenExpiresCount: number;
  jwtAccessTokenExpiresIn: number;
  jwtAuhSchema: string;
  jwtRefreshTokenExpiresIn: number;
  telegramBotToken: string;
  telegramQueryExpiration: number;
}
