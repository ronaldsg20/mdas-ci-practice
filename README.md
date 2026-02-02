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

This project uses a advanced multi-environment architecture with progressive stability:

1.  **Development:** Single replica, fast deployment.
2.  **Staging:** Dual replicas, High Availability tests, E2E gating.
3.  **Production:** **Native Blue-Green Deployment** (Zero Downtime).

For deep details on the pipeline, workflows, and Blue-Green logic, see:
👉 **[CI/CD Documentation](CI-CD.md)**

---

## 📂 Project Structure

A quick guide to the key files in this repository:

```text
├── .github/workflows/    # GitHub Actions pipelines (CI/CD logic)
├── k8s/
│   ├── base/             # Common Kubernetes resources (Deployment, Service)
│   ├── overlays/         # Environment specific configurations
│   │   ├── dev/          # Development overlay
│   │   ├── staging/      # Staging overlay
│   │   ├── prod-blue/    # Production Blue Slice
│   │   └── prod-green/   # Production Green Slice
├── src/                  # NestJS Application Source Code
├── test/                 # E2E Test Suite
├── CI-CD.md              # Detailed Pipeline Documentation
└── README.md             # This file
```

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

---

_Managed by GitHub Actions & OpenShift_
