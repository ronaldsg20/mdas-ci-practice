# MDAS CI Practice - NestJS Hello World API

A NestJS Hello World API with enterprise-grade CI/CD pipeline demonstrating modern DevOps practices.

[![CI Tests](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/ci.yml/badge.svg)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/ci.yml)
[![Docker Build](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/docker-build.yml/badge.svg)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/docker-build.yml)
[![Security Scan](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/security-scan.yml/badge.svg)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/security-scan.yml)

## 📋 Table of Contents
- [API Overview](#api-overview)
- [Branch Strategy](#branch-strategy)
- [CI/CD Pipeline](#cicd-pipeline)
- [Local Development](#local-development)
- [Docker](#docker)
- [OpenShift Deployment](#openshift-deployment)

---

## 🚀 API Overview

Simple REST API that returns "Hello World!" - deployed to OpenShift with automated CI/CD.

### Endpoint

- **GET /** - Returns "Hello World!"

### Example

```bash
curl https://mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com
```

**Response:**
```
Hello World!
```

---

## 🌿 Branch Strategy

We use a **multi-environment branching model** that maps Git branches to deployment environments:

### Branch Overview

| Branch | Environment | Auto-Deploy | Review Required | Purpose |
|--------|-------------|-------------|-----------------|---------|
| `main` | **Production** | ✅ Yes | ✅ Required | Stable production code |
| `staging` | **Staging** | ✅ Yes | ✅ Recommended | Pre-production testing |
| `develop` | **Development** | ✅ Yes | ❌ No | Active development |
| `feature/*` | **N/A** | ❌ No | N/A | Feature development |

### Workflow

```
1. Create feature branch from develop
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature

2. Make changes and push
   git add .
   git commit -m "feat: add my feature"
   git push origin feature/my-feature

3. Create PR to develop → Triggers CI tests + security scan
   - Auto-deploys to DEV on merge

4. Create PR from develop → staging → Triggers full CI/CD
   - Auto-deploys to STAGING on merge

5. Create PR from staging → main → Requires approval
   - Auto-deploys to PRODUCTION on merge
```

---

## ⚙️ CI/CD Pipeline

Our pipeline runs different workflows based on the event:

### On Pull Request (to main/develop/staging)

| Workflow | What it Does | Duration |
|----------|--------------|----------|
| **CI Tests** | Lint → Build → Unit Tests | ~25s |
| **Snyk Security** | Scan dependencies & containers | ~1m |
| **Code Scanning** | Upload security results to GitHub | ~5s |

**Total:** ~1.5 minutes

### On Push/Merge (to main/develop/staging)

| Workflow | What it Does | Duration |
|----------|--------------|----------|
| **Docker Build & Push** | Build multi-arch image → Push to GHCR | ~2m |

**Total:** ~2 minutes

### Weekly Security Scan

- **When:** Every Monday at 9 AM UTC
- **What:** Full dependency & container security scan
- **Reports to:** GitHub Security tab

### Image Tagging Strategy

When you push to environment branches, images are tagged as:

- `main` → `latest`, `main`, `main-abc1234`, `<commit-sha>`
- `develop` → `develop`, `develop-abc1234`, `<commit-sha>`  
- `staging` → `staging`, `staging-abc1234`, `<commit-sha>`
- `v1.2.3` (release) → `1.2.3`, `1.2`, `1`, `latest`

---

## 💻 Local Development

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm

### Installation

```bash
npm ci
```

### Run Development Server

```bash
npm run start:dev
```

API available at: `http://localhost:8080`

> **Note:** Port changed to 8080 (OpenShift standard)

### Scripts

```bash
npm run build      # Build for production
npm run lint       # Run ESLint
npm run test       # Run unit tests
npm run test:e2e   # Run end-to-end tests
npm run test:cov   # Generate coverage report
```

---

## 🐳 Docker

### Using Docker Compose

```bash
# Start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Build Docker Image Locally

```bash
docker build -t mdas-ci-practice .
docker run -p 8080:8080 mdas-ci-practice
```

### Pull from GitHub Container Registry

```bash
# Latest production image
docker pull ghcr.io/ronaldsg20/mdas-ci-practice:latest

# Specific environment
docker pull ghcr.io/ronaldsg20/mdas-ci-practice:develop
docker pull ghcr.io/ronaldsg20/mdas-ci-practice:staging
```

---

## ☸️ OpenShift Deployment

### Current Deployment

- **Environment:** Development
- **Namespace:** `rylangraham02-dev`
- **URL:** https://mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com

### Manual Deployment

If you need to deploy manually:

```bash
# Apply the deployment configuration
oc apply -f openshift-deployment.yaml

# Check status
oc get pods,svc,route

# View logs
oc logs deployment/mdas-ci-practice
```

### Automated Deployment

**Coming Soon:** Tekton Pipelines integration for automatic deployment on branch push.

See [`WEBHOOK_SETUP.md`](./WEBHOOK_SETUP.md) for configuration details.

---

## 🔒 Security

- **Snyk Integration:** Continuous vulnerability scanning
- **GitHub Security:** SARIF reports uploaded to Security tab
- **SBOM:** Software Bill of Materials generated for each image
- **Weekly Scans:** Automated dependency checks every Monday

View security results: [GitHub Security Tab](https://github.com/ronaldsg20/mdas-ci-practice/security)

---

## 📚 Additional Documentation

- [Webhook Setup Guide](./WEBHOOK_SETUP.md) - For repository admins
- [Implementation Plan](./docs/implementation_plan.md) - Full CI/CD roadmap (coming soon)

---

## 👥 Team Collaboration

### For Group Members

**Before making changes:**
1. Always pull latest from `develop`: `git pull origin develop`
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make commits with clear messages: `git commit -m "feat: description"`
4. Push and create PR to `develop` (not `main`)

**PR Guidelines:**
- All PRs must pass CI checks before merging
- Security vulnerabilities must be addressed
- At least 1 reviewer approval recommended for staging/production PRs

---

## 📄 License

This project is for educational purposes (Masters in CI/CD course).
