// import { HealthCheckError } from "@godaddy/terminus";
// import { Injectable } from "@nestjs/common";
// import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

// @Injectable()
// export class PlaylistHealthIndicator extends HealthIndicator {
//   async isHealthy(): Promise<HealthIndicatorResult> {
//     const isHealthy = true;
//     const result = this.getStatus("playlist", isHealthy);
//     if (isHealthy) {
//       return Promise.resolve(result);
//     }
//     throw new HealthCheckError("Playlist failed.", result);
//   }
// }
