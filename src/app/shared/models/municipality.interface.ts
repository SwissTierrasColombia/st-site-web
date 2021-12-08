import { DepartamentsInterface } from './departaments.interface';

export interface MunicipalityInterface {
  id: number;
  name: string;
  code: string;
  department: DepartamentsInterface;
}
