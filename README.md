# MDAS CI Practice 🚀

Welcome to the **MDAS CI Practice** repository. This project demonstrates a complete, automated, and secure CI/CD pipeline for a NestJS application using **GitHub Actions**, **Argo-style Blue-Green Deployments**, and **OpenShift**.

![CI/CD Flow](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-OpenShift-EE0000?style=for-the-badge&logo=redhat&logoColor=white)

---

## 🔗 Live Environments

| Environment | Branch | Status Badge | Live App URL |
|-------------|--------|--------------|--------------|
| **Dev** | `develop` | [![Deploy to OpenShift DEV](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/dev-deploy.yml/badge.svg?branch=develop)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/dev-deploy.yml) | [Launch Dev 🚀](http://dev-mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com) |
| **Staging** | `staging` | [![Deploy to OpenShift STAGING](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/staging-deploy.yml/badge.svg?branch=staging)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/staging-deploy.yml) | [Launch Staging 🧪](http://staging-mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com) |
| **Production** | `main` | [![Deploy to OpenShift PROD](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/prod-deploy.yml/badge.svg?branch=main)](https://github.com/ronaldsg20/mdas-ci-practice/actions/workflows/prod-deploy.yml) | [Launch Production 🌍](http://prod-mdas-ci-practice-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com) |

---

## 🏗️ Topology & Architecture

This project uses a advanced multi-environment architecture with progressive stability.

- **Development:** Single replica, fast deployment.
- **Staging:** Dual replicas, E2E testing gate.
- **Production:** **Blue-Green Deployment** (Zero Downtime).
  - Uses `prod-blue` and `prod-green` environments.
  - Automatically switches traffic without user impact.

For deep details on the pipeline, workflows, and diagrams, see:
👉 **[CI/CD Documentation](CI-CD.md)**

---

## 🛠️ Quick Start

### 1. Development
```bash
npm install
npm run start:dev
```

### 2. Testing
```bash
npm test         # Unit Tests
npm run test:e2e # E2E Tests
```

### 3. Contribution
Push to `develop` to trigger the CI pipeline. Create a PR to `staging` to promote.

---

_Managed by GitHub Actions & OpenShift_
