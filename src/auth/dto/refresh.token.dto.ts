export class RefreshTokenDto {
  constructor(at: string, rt: string) {
    this.at = at;
    this.rt = rt;
  }
  at: string;
  rt: string;
}
