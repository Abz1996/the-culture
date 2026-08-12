# Habesha Table — Ethiopian Food, Culture & Heritage

A full-stack demo web app showcasing Ethiopian cuisine, festivals, and regions —
built as a reference implementation of a **GitHub → Jenkins → Docker → Kubernetes**
CI/CD pipeline.

## What it does

- **Cuisine** — 7 dishes (Doro Wat, Injera, Shiro, Kitfo, Tibs, Gomen, the coffee
  ceremony) with region, spice level, vegan/fasting flags, and ingredients.
- **Culture** — festivals and rituals (Timkat, Meskel, Genna, the Ge'ez calendar,
  the coffee ceremony, Habesha kemis dress).
- **Regions** — six regions/zones with capital, language, and a highlight.

Content is descriptive text only — no third-party images are bundled, so there
are no licensing concerns shipping the repo. Each food/culture entry includes an
`imageQuery` field you can wire up to your own licensed photo library or CMS.

## Architecture

```
                ┌──────────────┐        ┌──────────────┐
   Browser ───► │  frontend     │ /api  │  backend      │
                │  React+Vite   │ ────► │  Express API  │
                │  served by    │       │  in-memory    │
                │  nginx:8080   │       │  JSON data    │
                └──────────────┘        └──────────────┘
                        ▲                        ▲
                        │      Kubernetes         │
                        │  (2 Deployments, 2 Services, Ingress, HPA)
                        └────────────┬────────────┘
                                     │
                    Docker images pushed by Jenkins
                                     │
                     GitHub webhook triggers Jenkins job
```

- **backend/** — Node.js + Express REST API (`/api/foods`, `/api/culture`,
  `/api/regions`), with `/healthz` and `/readyz` probes for Kubernetes.
- **frontend/** — React (Vite) SPA, built to static assets and served by nginx,
  which also reverse-proxies `/api/*` to the backend Service inside the cluster.
- **k8s/** — namespace, ConfigMap, Deployments, Services, Ingress, and a
  HorizontalPodAutoscaler for the backend.
- **Jenkinsfile** — the pipeline of record: checkout → test → build → scan →
  push → deploy → smoke test.
- **.github/workflows/ci.yml** — a lightweight companion GitHub Actions workflow
  for fast PR feedback (lint/test/build only — it does not push images or
  deploy). Jenkins remains the source of truth for delivery.

## Run it locally

**Option A — Docker Compose (closest to production):**

```bash
docker compose up --build
# frontend: http://localhost:8080
# backend:  http://localhost:4000/api
```

**Option B — Node directly, for fast iteration:**

```bash
# terminal 1
cd backend && npm install && npm run dev

# terminal 2
cd frontend && npm install && npm run dev
# open http://localhost:5173 (Vite dev server proxies /api to :4000)
```

**Run backend tests:**

```bash
cd backend && npm test
```

## The CI/CD pipeline

1. **GitHub** hosts the repo and fires a webhook (`push` to any branch, PR to
   `main`) at Jenkins (`Manage Jenkins → System → GitHub webhook`, or the
   `githubPush()` trigger in the Jenkinsfile).
2. **Jenkins** (`Jenkinsfile`, declarative pipeline) runs:
   - `Checkout` — clone the triggering commit.
   - `Install & Unit Test — Backend` — `npm ci && npm test` (Node's built-in
     test runner, 5 passing tests included).
   - `Install & Build — Frontend` — `npm ci && npm run build` (Vite production
     build, verified to compile cleanly).
   - `Static Analysis / Lint` — ESLint + `npm audit`, run in parallel.
   - `Build Docker Images` — multi-stage builds for both services, tagged
     `<build-number>-<short-sha>`.
   - `Scan Images` — Trivy vulnerability scan (swap for your org's scanner).
   - `Push Images` — push to your registry (Docker Hub/GHCR/ECR — set
     `REGISTRY` in the Jenkinsfile and add a `dockerhub-creds` credential).
   - `Deploy to Kubernetes` — **`main` branch only**: `kubectl apply` the
     manifests, then `kubectl set image` to roll out the new tag, waiting on
     `rollout status`.
   - `Smoke Test` — a throwaway pod curls `/healthz` on the backend Service
     before the pipeline is declared green.
3. **Docker** images are immutable, versioned artifacts — the same image that
   passed tests and scanning is the one deployed.
4. **Kubernetes** runs 2 replicas of each service behind ClusterIP Services, an
   Ingress for external traffic, liveness/readiness probes so bad rollouts are
   caught automatically, and an HPA that scales the backend 2→6 pods on CPU.

### Required Jenkins setup

| Credential ID        | Type                  | Purpose                              |
|-----------------------|-----------------------|---------------------------------------|
| `dockerhub-creds`     | Username/password      | Push images to the registry           |
| `kubeconfig-habesha`  | Secret file             | `kubectl` access to the target cluster |

Install the **Docker Pipeline**, **Kubernetes CLI**, and **GitHub** plugins,
then create a Multibranch Pipeline (or a regular Pipeline job) pointed at this
repo, using the `Jenkinsfile` at the repo root.

### Deploying manually (no Jenkins)

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml
kubectl -n habesha-table get pods -w
```

## Project layout

```
ethiopia-culture-app/
├── Jenkinsfile
├── docker-compose.yml
├── README.md
├── .github/workflows/ci.yml
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── data/{foods,culture,regions}.js
│   │   ├── routes/{foods,culture,regions}.js
│   │   └── middleware/errorHandler.js
│   ├── tests/foods.test.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx, main.jsx
│   │   ├── components/{Navbar,Footer,FoodCard,CultureCard,RegionCard,CoffeeRings}.jsx
│   │   ├── pages/{Home,Foods,Culture,Regions}.jsx
│   │   ├── lib/api.js
│   │   └── styles/index.css
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
└── k8s/
    ├── namespace.yaml
    ├── configmap.yaml
    ├── backend-deployment.yaml / backend-service.yaml
    ├── frontend-deployment.yaml / frontend-service.yaml
    ├── ingress.yaml
    └── hpa.yaml
```

## Extending this project

- Swap the in-memory data arrays for a real database (Postgres, Mongo) and add
  a StatefulSet or managed DB connection string via a Kubernetes Secret.
- Add a `values.yaml` and convert `k8s/` into a Helm chart for multi-environment
  (staging/prod) deploys.
- Wire the `imageQuery` fields to a licensed photo API or your own uploaded
  media, served from object storage (S3/GCS) rather than bundled in the repo.
- Add ArgoCD/Flux for GitOps-style deployment instead of Jenkins `kubectl apply`.
# the-culture
