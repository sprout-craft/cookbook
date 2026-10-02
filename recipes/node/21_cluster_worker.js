/**
 * Sprout Craft Engineering Cookbook
 * Recipe #21: Node.js Multi-Core Cluster Worker Orchestration
 *
 * Problem: Node.js is single-threaded by default; multi-core servers remain underutilized without clustering.
 */

const cluster = require('node:cluster');
const os = require('node:os');

function launchCluster(startWorkerCallback) {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Primary ${process.pid} is running. Forking ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.warn(`Worker ${worker.process.pid} exited (code: ${code}, signal: ${signal}). Respawning...`);
      cluster.fork();
    });
  } else {
    startWorkerCallback();
    console.log(`Worker ${process.pid} started and ready for requests.`);
  }
}

module.exports = { launchCluster };
