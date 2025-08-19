#!/bin/bash

# Health Check Script for SEP Prototype
# This script checks if all services are running and accessible

echo "🔍 SEP Prototype Health Check"
echo "================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Docker is running"

# Check if containers are running
echo ""
echo "📊 Container Status:"
docker compose ps

echo ""
echo "🌐 Service Accessibility Check:"

# Check Backend Health
echo -n "Backend (http://localhost:5000/health): "
if curl -f -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAILED"
fi

# Check Frontend
echo -n "Frontend (http://localhost:3000): "
if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAILED"
fi

# Check InfluxDB
echo -n "InfluxDB (http://localhost:8086/health): "
if curl -f -s http://localhost:8086/health > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAILED"
fi

# Check Grafana
echo -n "Grafana (http://localhost:3001): "
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAILED"
fi

echo ""
echo "🔗 Service URLs:"
echo "  📱 Frontend: http://localhost:3000"
echo "  🔌 Backend API: http://localhost:5000"
echo "  📊 InfluxDB: http://localhost:8086"
echo "  📈 Grafana: http://localhost:3001"
echo ""
echo "🔐 Default Credentials:"
echo "  InfluxDB: admin / password123"
echo "  Grafana: admin / admin123"
