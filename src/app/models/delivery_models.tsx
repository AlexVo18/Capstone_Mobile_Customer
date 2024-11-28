export interface DeliveryData {
  deliveryTaskId: number;
  serialNumber: string;
  staffId: number;
  staffName: string;
  managerId: number;
  managerName: string;
  customerId: number;
  dateShip: string;
  dateCreate: string;
  dateCompleted: string;
  status: string;
  note: string;
  confirmationPictureUrl: string;
  receiverName: string;
  type: string;
  contractAddress: DeliveryAddressData;
}

interface DeliveryAddressData {
  rentingRequestId: string;
  addressBody: string;
  district: string;
  city: string;
  coordinates: string;
}
interface ContractDeliveryData {
  contractDeliveryId: number;
  contractId: string;
  serialNumber: string;
  deliveryTaskId: number;
  pictureUrl: string;
  note: string;
  status: string;
}
interface DeliveryTaskLog {
  deliveryTaskLogId: number;
  deliveryTaskId: number;
  accountTriggerId: number;
  accountTriggerName: string;
  action: string;
  dateCreate: string;
}

export interface DeliveryDetailData {
  deliveryTask: DeliveryData;
  contractDeliveries: ContractDeliveryData[];
  deliveryTaskLogs: DeliveryTaskLog[];
}
