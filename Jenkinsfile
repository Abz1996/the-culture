// Jenkins declarative pipeline: GitHub -> Jenkins -> Docker -> Kubernetes
// Requires Jenkins plugins: Docker Pipeline, Kubernetes CLI, Git, Credentials Binding
// Requires Jenkins credentials:
//   - "dockerhub-creds"     (Username/Password or Docker registry token)
//   - "kubeconfig-habesha"  (Secret file: kubeconfig for the target cluster)
//   - "github-token"        (used by the GitHub webhook / status API, optional)

pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    REGISTRY        = "docker.io/abz1996"
    BACKEND_IMAGE   = "${REGISTRY}/habesha-backend"
    FRONTEND_IMAGE  = "${REGISTRY}/habesha-frontend"
    IMAGE_TAG       = "${env.BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
    K8S_NAMESPACE   = "habesha-table"
  }

  triggers {
    // Backed by a GitHub webhook (push + PR) pointed at <jenkins-url>/github-webhook/
    githubPush()
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        }
      }
    }

    stage('Install & Unit Test — Backend') {
      steps {
        dir('backend') {
          sh 'npm ci --no-audit --no-fund'
          sh 'npm test'
        }
      }
    }

    stage('Install & Build — Frontend') {
      steps {
        dir('frontend') {
          sh 'npm ci --no-audit --no-fund'
          sh 'npm run build'
        }
      }
    }

    stage('Static Analysis / Lint') {
      parallel {
        stage('Backend lint') {
          steps {
            dir('backend') {
              sh 'npx --yes eslint . --ext .js || true' // non-blocking example
            }
          }
        }
        stage('Dependency audit') {
          steps {
            dir('backend') {
              sh 'npm audit --audit-level=high || true'
            }
          }
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          backendImage  = docker.build("${BACKEND_IMAGE}:${IMAGE_TAG}", "./backend")
          frontendImage = docker.build("${FRONTEND_IMAGE}:${IMAGE_TAG}", "./frontend")
        }
      }
    }

    stage('Scan Images') {
      steps {
        // Example using Trivy; swap for your org's scanner of choice.
        sh """
          trivy image --exit-code 0 --severity HIGH,CRITICAL ${BACKEND_IMAGE}:${IMAGE_TAG} || true
          trivy image --exit-code 0 --severity HIGH,CRITICAL ${FRONTEND_IMAGE}:${IMAGE_TAG} || true
        """
      }
    }

    stage('Push Images') {
      steps {
        withDockerRegistry(credentialsId: 'dockerhub-creds', url: '') {
          sh """
            docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
            docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
            docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest
            docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest
            docker push ${BACKEND_IMAGE}:latest
            docker push ${FRONTEND_IMAGE}:latest
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      when { branch 'main' }
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-habesha', variable: 'KUBECONFIG')]) {
          sh """
            kubectl apply -f k8s/namespace.yaml
            kubectl apply -f k8s/configmap.yaml
            kubectl apply -f k8s/backend-deployment.yaml
            kubectl apply -f k8s/backend-service.yaml
            kubectl apply -f k8s/frontend-deployment.yaml
            kubectl apply -f k8s/frontend-service.yaml
            kubectl apply -f k8s/ingress.yaml
            kubectl apply -f k8s/hpa.yaml

            kubectl -n ${K8S_NAMESPACE} set image deployment/backend  backend=${BACKEND_IMAGE}:${IMAGE_TAG}
            kubectl -n ${K8S_NAMESPACE} set image deployment/frontend frontend=${FRONTEND_IMAGE}:${IMAGE_TAG}

            kubectl -n ${K8S_NAMESPACE} rollout status deployment/backend  --timeout=180s
            kubectl -n ${K8S_NAMESPACE} rollout status deployment/frontend --timeout=180s
          """
        }
      }
    }

    stage('Smoke Test') {
      when { branch 'main' }
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-habesha', variable: 'KUBECONFIG')]) {
          sh """
            kubectl -n ${K8S_NAMESPACE} run smoke-test --rm -i --restart=Never --image=curlimages/curl -- \
              curl -sf http://backend-service:4000/healthz
          """
        }
      }
    }
  }

  post {
    success {
      echo "Deployed ${BACKEND_IMAGE}:${IMAGE_TAG} and ${FRONTEND_IMAGE}:${IMAGE_TAG} to ${K8S_NAMESPACE}"
    }
    failure {
      echo "Pipeline failed at build #${env.BUILD_NUMBER}. Rolling back is manual: kubectl rollout undo deployment/<name> -n ${K8S_NAMESPACE}"
    }
    always {
      sh 'docker image prune -f || true'
    }
  }
}
