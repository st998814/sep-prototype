#!/bin/bash

# SEP Prototype - Docker Management Script
# This script provides easy commands to manage the Docker containers

set -e

case "$1" in
    "start")
    echo "Starting SEP Prototype services..."
        docker compose up --build -d
    echo "Services started! Check Docker Desktop for status."
    echo "Frontend: http://localhost:3000"
    echo "Backend API: http://localhost:5000"
    echo "InfluxDB: http://localhost:8086"
    echo "Grafana: http://localhost:3001"
        ;;
    "stop")
    echo "Stopping SEP Prototype services..."
        docker compose down
    echo "Services stopped!"
        ;;
    "restart")
    echo "Restarting SEP Prototype services..."
        docker compose down
        docker compose up --build -d
    echo "Services restarted!"
        ;;
    "logs")
    echo "Showing logs for all services..."
        docker compose logs -f
        ;;
    "status")
    echo "Service status:"
        docker compose ps
        ;;
    "clean")
    echo "Cleaning up containers, networks, and images..."
        docker compose down --rmi all --volumes --remove-orphans
    echo "Cleanup completed!"
        ;;
    "build")
    echo "Rebuilding all services..."
        docker compose build --no-cache
    echo "Build completed!"
        ;;
    *)
        echo "SEP Prototype Docker Manager"
        echo ""
        echo "Usage: $0 {start|stop|restart|logs|status|clean|build}"
        echo ""
        echo "Commands:"
        echo "  start    - Start all services in background"
        echo "  stop     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  logs     - Show real-time logs"
        echo "  status   - Show service status"
        echo "  clean    - Remove all containers, images, and volumes"
        echo "  build    - Rebuild all services without cache"
        echo ""
        echo "🐳 Make sure Docker Desktop is running before using these commands!"
        exit 1
        ;;
esac
