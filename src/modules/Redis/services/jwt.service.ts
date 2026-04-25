import { Injectable } from '@nestjs/common';
import { decodeProtectedHeader, importJWK, jwtVerify, type JWK } from 'jose';
import { RedisService } from './redis.service';

const JWKS_URL = process.env.JWKS_URL || 'http://iam-service';
const JWKS_CACHE_KEY = 'auth:jwks';
const JWKS_TTL_SECONDS = 5 * 60;

type JwksResponse = {
  keys: JWK[];
};

@Injectable()
export class JwtVerifyService {
  constructor(private readonly redisService: RedisService) {}

  private async fetchAndCacheJwks(): Promise<JWK[]> {
    const res = await fetch(`${JWKS_URL}/.well-known/jwks.json`);
    if (!res.ok) {
      throw new Error(`JWKS_FETCH_FAILED_${res.status}`);
    }

    const data = (await res.json()) as JwksResponse;
    if (!data?.keys?.length) {
      throw new Error('JWKS_EMPTY');
    }

    await this.redisService.set(
      JWKS_CACHE_KEY,
      JSON.stringify(data.keys),
      JWKS_TTL_SECONDS,
    );

    return data.keys;
  }

  private async getCachedJwks(): Promise<JWK[] | null> {
    const cached = await this.redisService.get(JWKS_CACHE_KEY);
    if (!cached) return null;

    try {
      const parsed = JSON.parse(cached) as JWK[];
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  async verifyAccessToken(token: string) {
    try {
      const header = decodeProtectedHeader(token);

      let keys =
        (await this.getCachedJwks()) ?? (await this.fetchAndCacheJwks());

      let jwk = keys.find((k) => k.kid === header.kid);

      if (!jwk) {
        keys = await this.fetchAndCacheJwks();
        jwk = keys.find((k) => k.kid === header.kid);
      }

      if (!jwk) {
        throw new Error('KEY_NOT_FOUND');
      }

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
}
