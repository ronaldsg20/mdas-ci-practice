# MDAS CI Practice

A NestJS application demonstrating a complete, automated CI/CD pipeline using **GitHub Actions**, **Kustomize**, and **OpenShift**.

![CI/CD Flow](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-OpenShift-EE0000?style=for-the-badge&logo=redhat&logoColor=white)

## 🚀 Environments & Status

| Environment | Branch | Status Badge | URL |
|-------------|--------|--------------|-----|
| **Development** | `develop` | [![Deploy to OpenShift DEV](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/dev-deploy.yml/badge.svg?branch=develop)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/dev-deploy.yml) | [Link](http://dev-mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com) |
| **Staging** | `staging` | [![Deploy to OpenShift STAGING](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/staging-deploy.yml/badge.svg?branch=staging)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/staging-deploy.yml) | [Link](http://staging-mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com) |
| **Production** | `main` | [![Deploy to OpenShift PROD](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/prod-deploy.yml/badge.svg?branch=main)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/prod-deploy.yml) | [Link](http://prod-mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com) |

## 🛠️ CI/CD Architecture

This project uses **GitHub Actions** for both CI (Integration) and CD (Deployment).

### Workflows
- **Pull Requests (CI)**:
  - `dev-pr.yml`: Lint → Unit Tests → Security Scan
  - `staging-pr.yml`: Lint → Unit Tests → Security Scan → **E2E Tests**
  - `prod-pr.yml`: Full Suite + High Severity Security Gate

- **Deployments (CD)**:
  - `dev-deploy.yml`: Build `develop` tag → Deploy to Dev (1 replica)
  - `staging-deploy.yml`: Build `staging` tag → Deploy to Staging (2 replicas)
  - `prod-deploy.yml`: Build `latest` tag → Deploy to Prod (3 replicas) + Smoke Tests

### Infrastructure
- **Kustomize**: Manages environment configurations (`k8s/overlays/dev`, `staging`, `prod`)
- **Docker**: Multi-stage builds pushed to GHCR (`ghcr.io/ronaldsg20/mdas-ci-practice`)
- **OpenShift**: Deployed to `rylangraham02-dev` namespace with unique routes.

## 📦 How to Contribute

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/my-cool-feature
   ```

2. **Develop & Test Locally**
   ```bash
   npm run start:dev  # Run app
   npm test           # Run unit tests
   npm run test:e2e   # Run integration tests
   ```

3. **Open a PR to `develop`**
   - Must pass `dev-pr` checks (Lint, Unit, Snyk).
   - Once merged, auto-deploys to **Dev**.

4. **Promote to Staging**
   - Open PR `develop` → `staging`.
   - Must pass `staging-pr` checks (includes E2E tests).
   - Once merged, auto-deploys to **Staging**.

5. **Release to Production**
   - Open PR `staging` → `main`.
   - Requires manual approval and full check pass.
   - Once merged, auto-deploys to **Production**.

## 🧪 Testing

- **Unit Tests**: `npm test`
- **E2E Tests**: `npm run test:e2e` (Validates endpoints, health, headers)
- **Security**: Snyk scans for vulnerabilities on every PR.

## 📂 Project Structure

```
├── .github/workflows/   # CI/CD definitions
├── k8s/                 # Kubernetes manifests (Kustomize)
│   ├── base/            # Common resources
│   └── overlays/        # Env-specific config (replicas, tags)
├── src/                 # NestJS source code
└── test/                # E2E test suite
```
