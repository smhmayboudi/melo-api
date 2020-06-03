export interface UserConfigServiceInterface {
  typeormDatabase: string;
  typeormHost: string;
  typeormLogging: boolean;
  typeormPassword: string;
  typeormPort: number;
  typeormSynchronize: boolean;
  typeormUsername: string;
}
