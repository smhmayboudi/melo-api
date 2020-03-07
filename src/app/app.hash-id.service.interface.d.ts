export interface AppHashIdServiceInterface {
  decode(hash: string): number;
  encode(id: number): string;
}
