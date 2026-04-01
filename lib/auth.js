import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tidymimo-fallback-secret-change-in-production';
const COOKIE_NAME = 'tm_admin_token';
const MAX_AGE = 60 * 60 * 8; // 8 hours

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: MAX_AGE });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromCookies(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
  return cookies[COOKIE_NAME] || null;
}

export function makeAuthCookie(token) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
}

export function clearAuthCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

export function requireAdmin(request) {
  const token = getTokenFromCookies(request);
  if (!token) return null;
  return verifyToken(token);
}
