import { createHmac, randomBytes } from "crypto";

const SECRET = process.env.TRACK_SESSION_SECRET || "tnt-track-session-2026-dev-key";

export interface TrackSession {
  orderId: string;
  iat: number;
}

export function signToken(orderId: string): string {
  const payload: TrackSession = {
    orderId: orderId.toUpperCase(),
    iat: Date.now(),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyToken(token: string): TrackSession | null {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = createHmac("sha256", SECRET).update(data).digest("base64url");
    if (sig !== expected) return null;
    const payload: TrackSession = JSON.parse(Buffer.from(data, "base64url").toString());
    if (!payload.orderId || !payload.iat) return null;
    if (Date.now() - payload.iat > 24 * 60 * 60 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

const COOKIE_NAME = "track_session";
const MAX_AGE = 24 * 60 * 60; // 24 hours

export function buildSetCookie(orderId: string): string {
  const token = signToken(orderId);
  return [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${MAX_AGE}`,
  ].join("; ");
}

export function getSessionFromCookie(cookieHeader: string | null): TrackSession | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(";").find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const token = match.trim().split("=").slice(1).join("=");
  return verifyToken(token);
}
