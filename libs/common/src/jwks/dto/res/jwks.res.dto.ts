import { IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class JwksResDto {
  constructor(id: string, private_key: string, public_key: string) {
    this.id = id;
    this.private_key = private_key;
    this.public_key = public_key;
  }

  @ApiProperty({
    description: "The primary key",
    example: "00000000-0000-0000-0000-000000000000",
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
