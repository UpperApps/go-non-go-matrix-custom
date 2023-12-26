#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';

import Debug from 'debug';

import app from './app.js';

const serverDebug = Debug('go-non-go-matrix:server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort({ val: process.env.PORT ?? '3000' });
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort({ val }: { val: string }) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError({ error }: { error: NodeJS.ErrnoException }) {
  const { syscall, code } = error;
  if (syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  if (addr) {
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    serverDebug(`Listening on ${bind}`);
  } else {
    onError({ error: new Error('No server address') });
  }
}
