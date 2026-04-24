import { decodeProtectedHeader, jwtVerify, importJWK } from 'jose';

const JWKS_URL = process.env.JWKS_URL || 'http://iam-service';

export async function verifyAccessToken(token: string) {
  try {
    const res = await fetch(`${JWKS_URL}/.well-known/jwks.json`);
    const { keys } = await res.json();

    const header = decodeProtectedHeader(token);

    const jwk = keys.find((k: any) => k.kid === header.kid);
    if (!jwk) throw new Error('KEY_NOT_FOUND');

    const publicKey = await importJWK(jwk); 

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ['RS256'],
    });

    return payload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    throw new Error('INVALID_TOKEN');
  }
}
