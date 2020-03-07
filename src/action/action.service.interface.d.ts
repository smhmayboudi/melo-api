import { ActionDto } from "./dto/action.dto";

export interface ActionServiceInterface {
  bulk(dto: ActionDto): Promise<ActionDto>;
}
