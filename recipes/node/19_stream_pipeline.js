/**
 * Sprout Craft Engineering Cookbook
 * Recipe #19: Node.js Stream Pipeline with Backpressure & Error Propagation
 *
 * Problem: fs.readFile loads the entire payload into RAM, risking out-of-memory crashes on large files.
 */

const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function compressFileGzip(sourcePath, destPath) {
  const readStream = fs.createReadStream(sourcePath);
  const gzipStream = zlib.createGzip({ level: 9 });
  const writeStream = fs.createWriteStream(destPath);

  // pipeline automatically handles backpressure, cleans up file descriptors, and rejects on errors
  await pipeline(readStream, gzipStream, writeStream);
  console.log(`Successfully compressed ${sourcePath} -> ${destPath}`);
}

module.exports = { compressFileGzip };
