export interface findDeliveriesInterface {
  items: itemDelivery[];
  currentPage: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface itemDelivery {
  id: number;
  code: string;
  deliveryDate: string;
  managerCode: string;
  municipalityCode: string;
  observations: string;
  operatorCode: number;
  userCode: number;
  deliveryStatusId: number;
}
