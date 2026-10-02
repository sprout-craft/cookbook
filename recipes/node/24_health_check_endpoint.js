/**
 * Sprout Craft Engineering Cookbook
 * Recipe #24: Kubernetes Liveness & Readiness Health Check Endpoint
 *
 * Problem: Kubernetes probes need distinct endpoints: liveness restarts pods; readiness halts traffic routing.
 */

function createHealthCheckRouter(dbClient) {
  return {
    // Liveness probe: checks if process is responsive
    getLiveness: (req, res) => {
      res.status(200).json({ status: 'UP', timestamp: Date.now() });
    },

    // Readiness probe: verifies external downstream dependencies
    getReadiness: async (req, res) => {
      try {
        const mem = process.memoryUsage();
        const dbHealthy = dbClient ? await dbClient.ping() : true;

        if (!dbHealthy) {
          return res.status(503).json({ status: 'DOWN', error: 'Database unreachable' });
        }

        res.status(200).json({
          status: 'READY',
          uptime: process.uptime(),
          heapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
        });
      } catch (err) {
        res.status(503).json({ status: 'DOWN', error: err.message });
      }
    },
  };
}

module.exports = { createHealthCheckRouter };
