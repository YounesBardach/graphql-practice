<p align="center">
  <img src="https://i.postimg.cc/0jzgZrM4/Chat-GPT-Image-Sep-4-2025-08-56-30-PM.png" alt="GraphQL Backend Starter Banner" width="900" />
</p>

<div align="center">

## GraphQL Backend Starter (Apollo Server + Prisma + SQLite)

A simple GraphQL backend project with Apollo Server, Prisma ORM, and SQLite database.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)](https://graphql.org/)
[![Apollo Server](https://img.shields.io/badge/Apollo_Server-311C87?logo=apollo-graphql&logoColor=white)](https://www.apollographql.com/docs/apollo-server/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [API Examples](#api-examples)

---

## About

This project is a simplified GraphQL backend starter for learning GraphQL fundamentals.

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Package manager for dependencies
- **Basic Knowledge**: Understanding of GraphQL, JavaScript, and databases
- **Development Environment**: Code editor and terminal access

## Quick Start

```bash
# 1) Clone or download the repository
git clone <repository-url>
cd graphql-backend-starter

# 2) Install dependencies
npm install

# 3) Create a .env file with the database connection string
echo "DATABASE_URL=\"file:./dev.db\"" > .env

# 4) Generate Prisma client
npx prisma generate

# 5) Set up database and run migrations
npx prisma migrate dev --name init

# 6) Seed the database with sample data
npm run seed

# 7) Start the development server
npm run dev
```

Now open **http://localhost:4000/graphql** to use Apollo Sandbox.

## API Examples

### Simple Queries

**Get all advertisers:**

```graphql
query {
  advertisers {
    id
    name
    campaigns {
      id
      name
      status
    }
  }
}
```

**Get all campaigns:**

```graphql
query {
  campaigns {
    id
    name
    status
    advertiser {
      name
    }
    creatives {
      id
      name
      type
    }
  }
}
```

### Mutations

**Create a new advertiser:**

```graphql
mutation {
  createAdvertiser(name: "New Company") {
    id
    name
  }
}
```

**Create a new campaign:**

```graphql
mutation {
  createCampaign(name: "Summer Campaign", advertiserId: "1") {
    id
    name
    status
  }
}
```

**Update campaign status:**

```graphql
mutation {
  updateCampaignStatus(id: "1", status: "PAUSED") {
    id
    name
    status
  }
}
```

### CLI Demo

Start the server in one terminal:

```bash
npm run dev
```

Then in another terminal, run the demo script:

```bash
npm run demo
```
