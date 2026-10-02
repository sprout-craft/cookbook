/**
 * Sprout Craft Engineering Cookbook
 * Recipe #22: Async Retry with Full Jitter Exponential Backoff
 *
 * Problem: Retrying failed network calls with fixed intervals causes synchronized retry bursts (thundering herd).
 */

async function retryWithBackoff(fn, { maxRetries = 3, baseDelayMs = 200, maxDelayMs = 5000 } = {}) {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        throw error;
      }

      // Exponential delay: baseDelay * 2^(attempt - 1)
      const exponential = baseDelayMs * Math.pow(2, attempt - 1);
      const cappedDelay = Math.min(maxDelayMs, exponential);
      // Full jitter: uniformly distributed between 0 and cappedDelay
      const jitterDelay = Math.floor(Math.random() * cappedDelay);

      console.warn(`Attempt ${attempt} failed: ${error.message}. Retrying in ${jitterDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, jitterDelay));
    }
  }
}

module.exports = { retryWithBackoff };
