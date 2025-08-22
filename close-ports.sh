#!/bin/bash
# close-ports.sh
# Usage:
#   ./close-ports.sh           # Close all common SEP prototype ports
#   ./close-ports.sh <PORT>    # Close a specific port

# List of common ports used in SEP prototype
PORTS=(3000 5000 5001 8086 3001)

close_port() {
  local port=$1
  echo "Closing port $port..."
  fuser -k ${port}/tcp 2>/dev/null || (lsof -ti tcp:${port} | xargs kill -9 2>/dev/null)
}

if [ -z "$1" ]; then
  # No argument: close all common ports
  for p in "${PORTS[@]}"; do
    close_port $p
  done
  echo "All common SEP prototype ports have been closed."
else
  # Argument provided: close specific port
  close_port $1
  echo "Port $1 has been closed."
fi
