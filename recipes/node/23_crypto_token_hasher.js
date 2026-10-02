/**
 * Sprout Craft Engineering Cookbook
 * Recipe #23: Timing-Safe String Comparison & HMAC Token Verification
 *
 * Problem: Standard `===` operator short-circuits on the first mismatched byte, leaking secret length via timing attacks.
 */

const crypto = require('node:crypto');

function verifyHmacSignature(rawPayload, secretKey, expectedSignatureHex) {
  const calculatedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(rawPayload)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignatureHex, 'utf8');
  const actualBuffer = Buffer.from(calculatedSignature, 'utf8');

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  // crypto.timingSafeEqual runs in constant time regardless of where bytes differ
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

module.exports = { verifyHmacSignature };
