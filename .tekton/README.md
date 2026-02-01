# Tekton Pipelines for OpenShift Deployment

Automated deployment pipelines using Tekton for multi-environment deployments.

## Overview

This directory contains Tekton resources for automatically deploying the application to OpenShift when code is pushed to specific branches.

## Structure

```
.tekton/
├── pipeline.yaml                    # Main deployment pipeline
├── tasks/
│   ├── kustomize-deploy.yaml       # Deploy with Kustomize
│   ├── verify-rollout.yaml         # Verify deployment
│   └── wait-for-github-workflow.yaml # Wait for Docker build
└── triggers/
    ├── eventlistener.yaml          # Listen for GitHub webhooks
    ├── triggerbinding.yaml         # Bind webhook data to params
    └── triggertemplates.yaml       # Templates for each environment
```

## Pipeline Flow

```
GitHub Push
    ↓
EventListener (detects branch)
    ↓
TriggerBinding (extract data)
    ↓
TriggerTemplate (create PipelineRun)
    ↓
Pipeline Steps:
  1. Clone repository
  2. Wait for Docker build (GitHub Actions)
  3. Deploy with Kustomize
  4. Verify rollout
```

## Branch → Environment Mapping

| Branch | Environment | Namespace | Image Tag | TriggerTemplate |
|--------|-------------|-----------|-----------|-----------------|
| develop | Development | rylangraham02-dev | develop | deploy-dev-template |
| staging | Staging | rylangraham02-staging | staging | deploy-staging-template |
| main | Production | rylangraham02-prod | latest | deploy-prod-template |

## Setup Instructions

### 1. Install Tekton Resources

```bash
# Install pipeline
oc apply -f .tekton/pipeline.yaml

# Install tasks
oc apply -f .tekton/tasks/

# Install triggers
oc apply -f .tekton/triggers/
```

### 2. Create Service Account

```bash
# The pipeline needs permissions to deploy
oc create serviceaccount pipeline -n rylangraham02-dev
oc adm policy add-role-to-user edit system:serviceaccount:rylangraham02-dev:pipeline
```

### 3. Configure GitHub Webhook

**Webhook URL:**
```
https://el-github-listener-rylangraham02-dev.apps.rm1.0a51.p1.openshiftapps.com
```

**Settings:**
- Payload URL: (URL above)
- Content type: application/json
- Events: Just the push event
- Active: ✓

### 4. Test Manual Trigger

```bash
# Trigger dev deployment manually
oc create -f - <<EOF
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  generateName: deploy-dev-manual-
  namespace: rylangraham02-dev
spec:
  pipelineRef:
    name: deploy-to-openshift
  params:
    - name: git-url
      value: https://github.com/ronaldsg20/mdas-ci-practice.git
    - name: git-revision
      value: develop
    - name: environment
      value: dev
    - name: image-tag
      value: develop
  workspaces:
    - name: source
      volumeClaimTemplate:
        spec:
          accessModes:
            - ReadWriteOnce
          resources:
            requests:
              storage: 1Gi
EOF
```

## Monitoring

### View Pipeline Runs

```bash
# List all pipeline runs
oc get pipelinerun -n rylangraham02-dev

# Watch a specific run
oc logs -f pipelinerun/deploy-dev-xxxxx -n rylangraham02-dev
```

### View EventListener Logs

```bash
oc logs -f deployment/el-github-listener -n rylangraham02-dev
```

## Pipeline Tasks

### 1. fetch-repository
- Uses ClusterTask `git-clone`
- Clones the repository at specified revision

### 2. wait-for-docker-build
- Waits for GitHub Actions Docker build to complete
- Currently uses simple sleep (3 minutes)
- **TODO:** Enhance with GitHub API integration

### 3. deploy-with-kustomize
- Applies environment-specific Kustomize overlay
- Uses `oc apply -k k8s/overlays/{env}`

### 4. verify-deployment
- Waits for rollout to complete (5min timeout)
- Checks pod status
- Fails pipeline if deployment unsuccessful

## Troubleshooting

### Pipeline Fails at "wait-for-docker-build"
- Check if GitHub Actions workflow completed successfully
- Verify Docker image was pushed to GHCR
- Check image exists: `docker pull ghcr.io/ronaldsg20/mdas-ci-practice:{tag}`

### Deployment Fails
```bash
# Check Kustomize build
kustomize build k8s/overlays/dev

# Check namespace permissions
oc auth can-i create deployments -n rylangraham02-dev --as=system:serviceaccount:rylangraham02-dev:pipeline
```

### EventListener Not Receiving Webhooks
```bash
# Check route
oc get route el-github-listener -n rylangraham02-dev

# Check EventListener logs
oc logs deployment/el-github-listener -n rylangraham02-dev

# Test webhook delivery in GitHub Settings → Webhooks
```

## Future Enhancements

- [ ] GitHub API integration for workflow status
- [ ] Slack/Discord notifications
- [ ] Automated rollback on failure
- [ ] Integration tests in pipeline
- [ ] Blue-green deployment with Argo Rollouts
