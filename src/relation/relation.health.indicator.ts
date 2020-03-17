// import { HealthCheckError } from "@godaddy/terminus";
// import { Injectable } from "@nestjs/common";
// import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

// @Injectable()
// export class RelationHealthIndicator extends HealthIndicator {
//   async isHealthy(): Promise<HealthIndicatorResult> {
//     const isHealthy = true;
//     const result = this.getStatus("relation", isHealthy);
//     if (isHealthy) {
//       return Promise.resolve(result);
//     }
//     throw new HealthCheckError("Relation failed.", result);
//   }
// }
