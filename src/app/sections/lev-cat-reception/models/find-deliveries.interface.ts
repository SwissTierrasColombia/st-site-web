export interface FindDeliveriesInterface {
  items: ItemDelivery[];
  currentPage: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface ItemDelivery {
  id: number;
  code: string;
  deliveryDate: string;
  managerCode: string;
  municipalityCode: string;
  observations: string;
  operatorCode: number;
  userCode: number;
  deliveryStatusId: number;
  departmentName: string;
  municipalityName: string;
  managerName: string;
  operatorName: string;
  finalComments: string;
}
