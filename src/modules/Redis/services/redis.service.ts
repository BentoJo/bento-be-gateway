import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client!: RedisClientType;

  async onModuleInit() {
    const redisPass = process.env.REDIS_PASS;
    const redisHost = process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;

    if (!redisHost || !redisPort) {
      throw new Error('Redis config missing');
    }

    this.client = createClient({
      username: 'default',
      password: redisPass,
      socket: {
        host: redisHost,
        port: parseInt(redisPort),
      },
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    await this.client.connect();
    console.log('✅ Redis connected');
  }

  getClient() {
    return this.client;
  }

  async set(key: string, value: string, ttlSeconds: number) {
    return this.client.set(key, value, { EX: ttlSeconds });
  }

  async get(key: string) {
    return this.client.get(key);
  }
}
