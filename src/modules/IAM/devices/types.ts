export interface ListDevicesRequest {
  userId: string;
  currentDeviceId?: string;
}

export interface DeviceListItem {
  id: string;
  deviceFingerprintHash: string;
  deviceName: string | null;
  firstSeenAt: string;
  lastSeenAt: string | null;
  isCurrent: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  revokedAt: string | null;
}

export interface ListDevicesResponse {
  devices: DeviceListItem[];
}
