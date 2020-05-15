import { IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class JwksJwksResDto {
  constructor(id: string, public_key: string, private_key: string) {
    this.id = id;
    this.public_key = public_key;
    this.private_key = private_key;
  }

  @ApiProperty({
    description: "The primary key",
    example: "4f38f054-38e9-11ea-9e09-0242ac110004",
  })
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    description: "The private key",
    example: `
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
`,
  })
  @Exclude()
  @IsString()
  readonly private_key: string;

  @ApiProperty({
    description: "The primary key",
    example: `
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
`,
  })
  @IsString()
  readonly public_key: string;
}
