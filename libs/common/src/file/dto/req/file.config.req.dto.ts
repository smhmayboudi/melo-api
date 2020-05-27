import { IsBoolean, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class FileConfigReqDto {
  constructor(
    s3AccessKeyId: string,
    s3Bucket: string,
    s3Endpoint: string,
    s3ForcePathStyle: boolean,
    s3SecretAccessKey: string,
    s3SslEnabled: boolean
  ) {
    this.s3AccessKeyId = s3AccessKeyId;
    this.s3Bucket = s3Bucket;
    this.s3Endpoint = s3Endpoint;
    this.s3ForcePathStyle = s3ForcePathStyle;
    this.s3SecretAccessKey = s3SecretAccessKey;
    this.s3SslEnabled = s3SslEnabled;
  }

  @ApiHideProperty()
  @IsString()
  readonly s3AccessKeyId: string;

  @ApiHideProperty()
  @IsString()
  readonly s3Bucket: string;

  @ApiHideProperty()
  @IsString()
  readonly s3Endpoint: string;

  @ApiHideProperty()
  @IsBoolean()
  readonly s3ForcePathStyle: boolean;

  @ApiHideProperty()
  @IsString()
  readonly s3SecretAccessKey: string;

  @ApiHideProperty()
  @IsBoolean()
  readonly s3SslEnabled: boolean;
}
