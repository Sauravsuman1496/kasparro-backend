🚀 Kasparro Backend Assignment

A Dockerized backend service that ingests cryptocurrency data from multiple sources, normalizes it, tracks ETL runs, and exposes REST APIs for querying and monitoring.

📌 Features

FastAPI-based REST backend

PostgreSQL database

Data ingestion from:

CoinPaprika public API

CSV file

Normalized crypto asset storage

Raw data tracking

ETL run metadata tracking

Dockerized setup (API + DB + ETL worker)

Swagger / OpenAPI documentation

Health & monitoring endpoints

🛠 Tech Stack
Layer	Tech
Backend API	Node.js + Express
ETL Worker	Node.js
ORM	Prisma
Database	PostgreSQL
Data Sources	CoinPaprika API, CSV
Containerization	Docker & Docker Compose
API Docs	Swagger
📂 Project Structure
.
├── api/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── server.js
│   ├── routes/
│   └── package.json
│
├── etl/
│   ├── worker.js
│   └── package.json
│
├── docker-compose.yml
├── Dockerfile.api
├── Dockerfile.etl
├── .env.example
└── README.md

⚙️ Environment Variables

Create .env in project root:

DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres

🐳 Running with Docker
1️⃣ Build Images
docker compose build

2️⃣ Start Database First
docker compose up -d db

3️⃣ Run Migrations
docker compose run --rm api npx prisma migrate deploy

4️⃣ Start All Services
docker compose up

🌐 API Access
Service	URL
API Base	http://localhost:8000

Swagger Docs	http://localhost:8000/docs

Health Check	http://localhost:8000/health
📡 API Endpoints
✅ Health Check

GET /health

{
  "status": "ok",
  "timestamp": 1735168000
}

📊 Get Crypto Data

GET /data?limit=10&offset=0

{
  "count": 10,
  "data": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "priceUsd": 88000,
      "source": "coinpaprika"
    }
  ]
}

📈 ETL Run Stats

GET /stats

{
  "totalRuns": 3,
  "lastRun": "2025-12-26T00:40:00Z"
}

🔄 Data Ingestion Flow

Runs automatically via ETL worker container.

Steps:

Fetch data from CoinPaprika API

Load CSV dataset

Store raw payloads in RawCoin table

Normalize data into Coin table

Track each run in EtlRun table

🧪 Development Commands

Rebuild everything clean:

docker compose down -v
docker volume prune -f
docker compose build --no-cache
docker compose up

🧠 Design Decisions

Prisma ORM for schema control & migrations

ETL isolated as separate container

Docker-first development workflow

Centralized PostgreSQL store

Clean schema for analytics expansion

👤 Author

Saurav Suman
