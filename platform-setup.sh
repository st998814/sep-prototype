#!/bin/bash

# Platform detection and port configuration
detect_platform() {
    case "$(uname -s)" in
        Darwin*)
            echo "🍎 Detected macOS - Using backend port 5001 (avoiding AirPlay conflicts)"
            export BACKEND_PORT=5001
            export BACKEND_URL="http://localhost:5001"
            ;;
        Linux*)
            echo "🐧 Detected Linux - Using backend port 5000"
            export BACKEND_PORT=5000
            export BACKEND_URL="http://localhost:5000"
            ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*)
            echo "🪟 Detected Windows - Using backend port 5000"
            export BACKEND_PORT=5000
            export BACKEND_URL="http://localhost:5000"
            ;;
        *)
            echo "❓ Unknown platform - Using default backend port 5000"
            export BACKEND_PORT=5000
            export BACKEND_URL="http://localhost:5000"
            ;;
    esac
}

# Create platform-specific .env file
create_env_file() {
    detect_platform
    
    cat > .env << EOF
# Platform-specific configuration
BACKEND_PORT=${BACKEND_PORT}
BACKEND_URL=${BACKEND_URL}

# React App Environment Variables
REACT_APP_BACKEND_PORT=${BACKEND_PORT}
REACT_APP_API_URL=http://backend:5000

# InfluxDB Configuration
INFLUXDB_URL=http://influxdb:8086
INFLUXDB_TOKEN=your-token-here
INFLUXDB_ORG=sep-org
INFLUXDB_BUCKET=sep-bucket

# Grafana Configuration
GRAFANA_URL=http://localhost:3001
EOF

    echo "✅ Created .env file with platform-specific settings"
    echo "📋 Backend will run on: ${BACKEND_URL}"
    echo "🔗 Frontend will connect to backend via Docker network"
}

# Run platform detection if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    create_env_file
fi
