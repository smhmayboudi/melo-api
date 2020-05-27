import { IsBoolean, IsNumberString, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class DataConfigTypeOrmReqDto {
  constructor(
    typeOrmDatabase: string,
    typeOrmHost: string,
    typeOrmLogging: boolean,
    typeOrmPassword: string,
    typeOrmPort: number,
    typeOrmSynchronize: boolean,
    typeOrmUsername: string
  ) {
    this.typeOrmDatabase = typeOrmDatabase;
    this.typeOrmHost = typeOrmHost;
    this.typeOrmLogging = typeOrmLogging;
    this.typeOrmPassword = typeOrmPassword;
    this.typeOrmPort = typeOrmPort;
    this.typeOrmSynchronize = typeOrmSynchronize;
    this.typeOrmUsername = typeOrmUsername;
  }

  @ApiHideProperty()
  @IsString()
  readonly typeOrmDatabase: string;

  @ApiHideProperty()
  @IsString()
  readonly typeOrmHost: string;

  @ApiHideProperty()
  @IsBoolean()
  readonly typeOrmLogging: boolean;

  @ApiHideProperty()
  @IsString()
  readonly typeOrmPassword: string;

  @ApiHideProperty()
  @IsNumberString()
  readonly typeOrmPort: number;

  @ApiHideProperty()
  @IsBoolean()
  readonly typeOrmSynchronize: boolean;

  @ApiHideProperty()
  @IsString()
  readonly typeOrmUsername: string;
}
