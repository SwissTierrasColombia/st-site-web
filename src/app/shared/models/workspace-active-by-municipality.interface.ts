import { MunicipalityInterface } from 'src/app/shared/models/municipality.interface';

export interface WorkspaceActiveByMunicipalityInterface {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: null;
  operators: OperatorElement[];
  managers: ManagerElement[];
  municipality: MunicipalityInterface;
}

export interface ManagerElement {
  managerCode: number;
  manager: ManagerManager;
  observations: string;
  startDate: Date;
}

export interface ManagerManager {
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

export interface OperatorElement {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numberParcelsExpected: number;
  workArea: number;
  operatorCode: number;
  operator: OperatorOperator;
  managerCode: number;
  manager: ManagerManager;
  observations: string;
  municipality: MunicipalityInterface;
}

export interface OperatorOperator {
  id: number;
  name: string;
  taxIdentificationNumber: string;
  createdAt: string;
  isPublic: boolean;
  alias: string;
  operatorState: RState;
}
