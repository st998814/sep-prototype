#!/bin/bash

# Quick Docker Environment Test Script
echo "🧪 Quick Docker Environment Test"
echo "================================"

# Function to check if a port is open
check_port() {
    local port=$1
    local service=$2
    echo -n "Checking $service (port $port): "
    if nc -z localhost $port 2>/dev/null; then
        echo "✅ OPEN"
        return 0
    else
        echo "❌ CLOSED"
        return 1
    fi
}

# Function to test HTTP endpoint
test_http() {
    local url=$1
    local service=$2
    echo -n "Testing $service ($url): "
    if curl -s -f "$url" > /dev/null 2>&1; then
        echo "✅ RESPONDING"
        return 0
    else
        echo "❌ NOT RESPONDING"
        return 1
    fi
}

echo ""
echo "📊 Docker Status:"
if docker info > /dev/null 2>&1; then
    echo "✅ Docker is running"
else
    echo "❌ Docker is not running - Please start Docker Desktop"
    exit 1
fi

echo ""
echo "📦 Container Status:"
docker compose ps

echo ""
echo "🌐 Port Availability Test:"
check_port 3000 "Frontend"
check_port 5001 "Backend" 
check_port 8086 "InfluxDB"
check_port 3001 "Grafana"

echo ""
echo "🔗 HTTP Response Test:"
test_http "http://localhost:3000" "Frontend"
test_http "http://localhost:5001" "Backend"
test_http "http://localhost:8086/health" "InfluxDB"
test_http "http://localhost:3001" "Grafana"

echo ""
echo "📱 Frontend-Only Test Instructions:"
echo "1. Run: docker compose up frontend --build"
echo "2. Open: http://localhost:3000"
echo "3. You should see the SEP Prototype test page"

echo ""
echo "🚀 Full Environment Test Instructions:"
echo "1. Run: ./docker-manager.sh start"
echo "2. Wait 2-3 minutes for all services to start"
echo "3. Run this script again to verify all services"
