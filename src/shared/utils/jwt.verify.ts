import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS_URL = process.env.JWKS_URL || 'http://iam-service';
const JWKS = createRemoteJWKSet(new URL(`${JWKS_URL}/.well-known/jwks.json`));

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      algorithms: ['RS256'],
    });

    return payload;
  } catch (err) {
    throw new Error('INVALID_TOKEN');
  }
}
