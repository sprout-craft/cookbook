/**
 * Sprout Craft Engineering Cookbook
 * Recipe #20: Production Graceful Shutdown Handler
 *
 * Problem: In Kubernetes / Docker, SIGTERM without graceful handling abruptly drops ongoing HTTP requests.
 */

function setupGracefulShutdown(server, cleanupTasks = [], timeoutMs = 10000) {
  let isShuttingDown = false;

  const shutdown = async (signal) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`Received ${signal}. Starting graceful shutdown...`);

    // Force exit if tasks hang
    const forceExitTimer = setTimeout(() => {
      console.error('Graceful shutdown timed out. Forcing termination.');
      process.exit(1);
    }, timeoutMs);
    forceExitTimer.unref();

    // 1. Stop receiving new connections
    server.close(async (err) => {
      if (err) {
        console.error('Error closing HTTP server:', err);
        process.exit(1);
      }

      console.log('HTTP server closed. Executing cleanup handlers...');
      try {
        for (const task of cleanupTasks) {
          await task();
        }
        console.log('All cleanup tasks completed. Exiting cleanly.');
        process.exit(0);
      } catch (cleanErr) {
        console.error('Cleanup task encountered an error:', cleanErr);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = { setupGracefulShutdown };
