import { MunicipalityInterface } from './municipality.interface';
export interface OperatorsAssignWorkspaceInterface {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numberParcelsExpected: number;
  workArea: number;
  operatorCode: number;
  operator: Operator;
  managerCode: number;
  manager: Manager;
  observations: string;
  municipality: MunicipalityInterface;
}

export interface Manager {
  id: number;
  name: string;
  taxIdentificationNumber: string;
  alias: string;
  createdAt: string;
  managerState: RState;
}

export interface RState {
  id: number;
  name: string;
}

export interface Operator {
  id: number;
  name: string;
  taxIdentificationNumber: string;
  createdAt: string;
  isPublic: boolean;
  alias: string;
  operatorState: RState;
}
