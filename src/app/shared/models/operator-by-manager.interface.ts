export interface OperatorByManager {
  id: number;
  name: string;
  taxIdentificationNumber: string;
  createdAt: string;
  isPublic: boolean;
  alias: string;
  operatorState: OperatorState;
}

export interface OperatorState {
  id: number;
  name: string;
}
