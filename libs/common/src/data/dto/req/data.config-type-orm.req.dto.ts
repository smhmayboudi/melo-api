import { IsBoolean, IsNumberString, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class DataConfigTypeOrmReqDto {
  constructor(
    typeormDatabase: string,
    typeormHost: string,
    typeormLogging: boolean,
    typeormPassword: string,
    typeormPort: number,
    typeormSynchronize: boolean,
    typeormUsername: string
  ) {
    this.typeormDatabase = typeormDatabase;
    this.typeormHost = typeormHost;
    this.typeormLogging = typeormLogging;
    this.typeormPassword = typeormPassword;
    this.typeormPort = typeormPort;
    this.typeormSynchronize = typeormSynchronize;
    this.typeormUsername = typeormUsername;
  }

  @ApiHideProperty()
  @IsString()
  readonly typeormDatabase: string;

  @ApiHideProperty()
  @IsString()
  readonly typeormHost: string;

  @ApiHideProperty()
  @IsBoolean()
  readonly typeormLogging: boolean;

  @ApiHideProperty()
  @IsString()
  readonly typeormPassword: string;

  @ApiHideProperty()
  @IsNumberString()
  readonly typeormPort: number;

  @ApiHideProperty()
  @IsBoolean()
  readonly typeormSynchronize: boolean;

  @ApiHideProperty()
  @IsString()
  readonly typeormUsername: string;
}
