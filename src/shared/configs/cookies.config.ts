const isLocal = process.env.isLocal === 'true';
const dom = isLocal ? 'localhost' : 'bentojo.com';

const COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 40; // 40 days

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !isLocal,
  sameSite: 'lax' as const,
  domain: dom,
  maxAge: COOKIE_MAX_AGE_MS,
  path: '/',
};

/**
 * Device token cookie options.
 * httpOnly so JavaScript (including XSS) can never read or steal it.
 * 1-year max-age so the same physical device is recognised across sessions.
 */
export const DEVICE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !isLocal,
  sameSite: 'lax' as const,
  domain: dom,
  maxAge: COOKIE_MAX_AGE_MS,
  path: '/',
};

/**
 * Options for clearing a cookie on logout. A cookie is only removed when the
 * clear call's domain/path/sameSite/secure match how it was set — so reuse the
 * same attributes (just without maxAge).
 */
export const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !isLocal,
  sameSite: 'lax' as const,
  domain: dom,
  path: '/',
};
