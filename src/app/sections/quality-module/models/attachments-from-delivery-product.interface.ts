export interface AttachmentsFromDeliveryProductInterface {
  attachmentId: number;
  type: string;
  data: Data | null;
  attachmentDate: number;
  observations: string;
  deliveryProductId: number;
}

export interface Data {
  isValid?: boolean;
  status?: string;
  version?: string;
  domain?: string;
  port?: string;
  username?: string;
  password?: string;
}
