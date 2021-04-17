import { ActionBulkReqDto } from "@melo/common";

export interface ActionServiceInterface {
  bulk(dto: ActionBulkReqDto): Promise<ActionBulkReqDto>;
}
