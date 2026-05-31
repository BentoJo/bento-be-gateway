export interface DeviceInfo {
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

export interface ClientData {
  deviceFingerprint: string;
  deviceInfo: string;
  location: string;
  ipAddress?: string;
  deviceToken?: string | null;
  fingerprintComponents?: FingerprintComponents | null;
}

export interface FingerprintComponents {
  deviceName: string;
  platform: string;
  hardwareConcurrency: number;
}
