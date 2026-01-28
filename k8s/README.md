# Kustomize Multi-Environment Deployments

This directory contains Kustomize configurations for deploying the application across multiple environments.

## Structure

```
k8s/
├── base/                    # Base configuration (shared across all environments)
│   ├── deployment.yaml      # Deployment manifest
│   ├── service.yaml         # Service manifest
│   ├── route.yaml           # OpenShift Route manifest
│   └── kustomization.yaml   # Base kustomization
│
└── overlays/                # Environment-specific overlays
    ├── dev/                 # Development environment
    │   └── kustomization.yaml
    ├── staging/             # Staging environment
    │   └── kustomization.yaml
    └── prod/                # Production environment
        └── kustomization.yaml
```

## Environment Configuration

| Environment | Namespace | Replicas | Image Tag | NODE_ENV |
|-------------|-----------|----------|-----------|----------|
| Development | `rylangraham02-dev` | 1 | `develop` | development |
| Staging | `rylangraham02-staging` | 2 | `staging` | staging |
| Production | `rylangraham02-prod` | 3 | `latest` | production |

## Usage

### Preview Changes

```bash
# Preview dev environment
kustomize build k8s/overlays/dev

# Preview staging environment
kustomize build k8s/overlays/staging

# Preview prod environment
kustomize build k8s/overlays/prod
```

### Deploy to OpenShift

```bash
# Deploy to development
oc apply -k k8s/overlays/dev

# Deploy to staging
oc apply -k k8s/overlays/staging

# Deploy to production
oc apply -k k8s/overlays/prod
```

### Verify Deployment

```bash
# Check deployment status
oc get all -n rylangraham02-dev
oc get all -n rylangraham02-staging
oc get all -n rylangraham02-prod
```

## Automated Deployment

Deployments are triggered automatically via Tekton Pipelines when pushing to:
- `develop` branch → Deploy to DEV
- `staging` branch → Deploy to STAGING
- `main` branch → Deploy to PROD

## Resource Limits

### Development
- **Memory:** 128Mi (request), 256Mi (limit)
- **CPU:** 100m (request), 200m (limit)

### Staging
- **Memory:** 128Mi (request), 256Mi (limit)
- **CPU:** 100m (request), 200m (limit)

### Production
- **Memory:** 256Mi (request), 512Mi (limit)
- **CPU:** 100m (request), 200m (limit)
