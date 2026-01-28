# GitHub Webhook Setup for Tekton Pipelines as Code

## Instructions for Repository Admin

**Repository:** `ronaldsg20/mdas-ci-practice`

---

## Step 1: Get Webhook URL from OpenShift

Since you don't have access to the `openshift-pipelines` namespace, your colleague with admin access needs to run this command:

```bash
oc get route pipelines-as-code-controller \
  -n openshift-pipelines \
  -o jsonpath='{.spec.host}'
```

**Expected Output:**
```
pipelines-as-code-controller-openshift-pipelines.apps.rm1.0a51.p1.openshiftapps.com
```

**Full Webhook URL will be:**
```
https://pipelines-as-code-controller-openshift-pipelines.apps.rm1.0a51.p1.openshiftapps.com
```

---

## Step 2: Generate Webhook Secret

Run this command locally to generate a secure random secret:

```bash
openssl rand -hex 20
```

**Save this secret!** You'll need it in both GitHub and OpenShift.

**Example output:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

---

## Step 3: Admin Tasks in GitHub Repository Settings

Your colleague needs to:

### A. Go to Repository Settings
1. Navigate to: https://github.com/ronaldsg20/mdas-ci-practice/settings/hooks
2. Click **"Add webhook"**

### B. Configure Webhook

**Payload URL:**
```
https://pipelines-as-code-controller-openshift-pipelines.apps.rm1.0a51.p1.openshiftapps.com
```

**Content type:**
```
application/json
```

**Secret:**
```
[paste the secret from Step 2]
```

**Which events should trigger this webhook?**
- ✅ **Just the push event** (for now)
- OR select individual events:
  - ✅ Pushes
  - ✅ Pull requests

**Active:**
- ✅ Check this box

### C. Click "Add webhook"

---

## Step 4: Create Secret in OpenShift (You Can Do This)

Run these commands in your namespace:

```bash
# Set the webhook secret (use the one from Step 2)
WEBHOOK_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"

# Create the secret
oc create secret generic pipelines-as-code-secret \
  --from-literal=webhook.secret=$WEBHOOK_SECRET \
  -n rylangraham02-dev
```

---

## Step 5: Verify Webhook Setup

### In GitHub (Admin checks):
1. Go to Settings → Webhooks
2. Click on the webhook you just created
3. Scroll to "Recent Deliveries"
4. You should see a ping event with a ✅ green checkmark

### In OpenShift (You check):
```bash
# Check if secret was created
oc get secret pipelines-as-code-secret -n rylangraham02-dev

# Check EventListener (after creating Tekton resources)
oc get eventlistener -n rylangraham02-dev
```

---

## Alternative: Use GitHub App (Recommended for Production)

If webhook setup is too complex, use the **Red Hat OpenShift Pipelines GitHub App**:

### Admin Tasks:
1. Install the app: https://github.com/apps/red-hat-openshift-pipelines
2. Grant access to `ronaldsg20/mdas-ci-practice` repository
3. Copy the App ID and Private Key

### Your Tasks:
Create secret with GitHub App credentials:
```bash
oc create secret generic github-app-secret \
  --from-literal=github-application-id=YOUR_APP_ID \
  --from-file=github-private-key=path/to/private-key.pem \
  -n rylangraham02-dev
```

---

## Quick Reference for Your Colleague

**To send to your colleague (copy/paste ready):**

```
Hi,

I need you to set up a webhook in our GitHub repository for CI/CD automation.

Repository: https://github.com/ronaldsg20/mdas-ci-practice

Steps:
1. First, get the webhook URL by asking the OpenShift admin or check the OpenShift Pipelines documentation for the Developer Sandbox webhook endpoint
2. Go to: https://github.com/ronaldsg20/mdas-ci-practice/settings/hooks
3. Click "Add webhook"
4. Configure:
   - Payload URL: [The URL from step 1]
   - Content type: application/json
   - Secret: [I'll provide this separately for security]
   - Events: "Just the push event"
5. Click "Add webhook"

Let me know when it's done so I can verify it's working!
```

---

## Troubleshooting

**Webhook shows "404 Not Found":**
- The Pipelines as Code controller might not be installed
- Check with OpenShift cluster admin

**Webhook shows "401 Unauthorized":**
- Secret mismatch between GitHub and OpenShift
- Recreate the secret in OpenShift

**No PipelineRuns triggered:**
- Check `.tekton/` files are committed to repository
- Verify annotations in `.tekton/push.yaml`
- Check EventListener logs:
  ```bash
  oc logs -l app.kubernetes.io/component=controller -n openshift-pipelines
  ```
