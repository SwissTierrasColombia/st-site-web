export interface getWorkspacesByOperatorInterface {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numberParcelsExpected: number;
  workArea: number;
  operatorCode: number;
  operator: Manager;
  managerCode: number;
  manager: Manager;
  observations: string;
  municipality: Municipality;
}

export interface Manager {
  id: number;
  name: string;
  taxIdentificationNumber: string;
  alias: string;
  createdAt: string;
  isPublic?: boolean;
}

export interface Municipality {
  id: number;
  name: string;
  code: string;
  department?: Municipality;
}
