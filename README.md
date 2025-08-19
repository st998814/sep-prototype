# Project Prototype

This is a prototype version for SEP (Influx Db ) built with a minimun architecture using Docker.

## Architecture

- **Frontend**: React application with TypeScript support (port 3000)
- **Backend**: Node.js/Express API (port 5001) *Note: Changed from 5000 to avoid macOS conflicts*
- **InfluxDB**: Time-series database (port 8086)
- **Grafana**: Data visualization dashboard (port 3001)

## Getting Started

### Prerequisites

- **Docker Desktop**: Download and install from [docker.com](https://www.docker.com/products/docker-desktop/)
- Make sure Docker Desktop is running before proceeding

### Quick Start with Docker Desktop

#### Option 1: Using Docker Manager Script (Recommended)
```bash
# Start all services
./docker-manager.sh start

# Stop all services
./docker-manager.sh stop

# View logs
./docker-manager.sh logs

# Check status
./docker-manager.sh status

# Clean up everything
./docker-manager.sh clean
```

#### Option 2: Using Docker Compose directly
```bash
# Start all services in background
docker compose up --build -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Check service status
docker compose ps
```

#### Option 3: Using VS Code Tasks
If you're using VS Code, you can use the predefined tasks:
- Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Tasks: Run Task"
- Select from available Docker tasks

### Docker Desktop Integration Features

1. **Container Monitoring**: View all containers in Docker Desktop dashboard
2. **Health Checks**: Services include health check endpoints for status monitoring
3. **Volume Management**: Persistent data storage for InfluxDB and Grafana
4. **Network Isolation**: Services communicate through internal Docker network
5. **Resource Management**: Monitor CPU and memory usage in Docker Desktop

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - InfluxDB: http://localhost:8086
   - Grafana: http://localhost:3001

4. Check service health:
   ```bash
   ./health-check.sh
   ```

### Docker Desktop Monitoring

Once services are running, you can monitor them in Docker Desktop:

1. **Containers Tab**: View all running containers with real-time resource usage
2. **Images Tab**: Manage built Docker images
3. **Volumes Tab**: View persistent data volumes for InfluxDB and Grafana
4. **Logs**: Click on any container to view its logs in real-time

### Troubleshooting

- **Port conflicts**: Make sure ports 3000, 3001, 5001, and 8086 are not used by other applications
  - *Note: Backend uses port 5001 instead of 5000 to avoid macOS AirPlay conflicts*
- **Docker not running**: Ensure Docker Desktop is started and running
- **Build failures**: Try cleaning up with `./docker-manager.sh clean` and rebuild
- **Service not accessible**: Wait a few minutes for services to fully start, especially InfluxDB

### Default Credentials

- **InfluxDB**: admin / password123
- **Grafana**: admin / admin123

## Project Structure

```
sep-prototype/
├── frontend/           # React frontend application with TypeScript support
│   ├── Dockerfile     # Frontend container configuration
│   ├── package.json   # React dependencies with TypeScript types
│   ├── tsconfig.json  # TypeScript configuration
│   ├── src/
│   │   ├── component/ # TypeScript React components (.tsx)
│   │   ├── App.js     # Main application component
│   │   └── index.js   # Application entry point
│   └── public/        # Static assets
├── backend/           # Node.js backend API
│   ├── Dockerfile     # Backend container configuration
│   ├── package.json   # Node.js dependencies
│   └── index.js       # Main server file
├── influxdb/          # InfluxDB configuration files
├── grafana/           # Grafana configuration files
├── docker-compose.yml # Docker services orchestration
├── env.docker         # Environment variables
├── minimal-test.sh    # Minimal testing script with TypeScript support
├── docker-manager.sh  # Docker management script
└── README.md          # This file
```

## Development

### Minimal Testing (Recommended for Development)

```bash
# Start frontend and backend containers for testing
./minimal-test.sh start

# Test services and TypeScript compilation
./minimal-test.sh test

# View logs
./minimal-test.sh logs

# Stop testing containers
./minimal-test.sh stop
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install
npm start
```


