import { Metadata } from '@grpc/grpc-js';
import type { AuthenticatedUser } from '../types/auth/authenticated-user';

export function buildRequiredUserMetadata(user: AuthenticatedUser): Metadata {
  const metadata = new Metadata();
  metadata.set('x-user-id', user.id);

  return metadata;
}
