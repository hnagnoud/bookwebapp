pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "hnagnoud/node-app"
        K8S_DEPLOYMENT = "k8s/deploy_svc.yaml"
        NAMESPACE = "test"
        DOCKER_HOST = "tcp://localhost:2375"
    }        

    stages {
        stage('Debug Environment') {
            steps {
                script {
                    sh 'set -x'
                    sh 'pwd'
                    sh 'ls -la'
                    sh 'whoami'
                }
            }
        }

        stage('Setup Git Safe Directory') {
            steps {
                sh 'git config --global --add safe.directory /var/jenkins_home/workspace/test'
            }
        }

        stage('Checkout Code') {
            steps {
                script {
                    sh 'echo "Checking out code..."'
                    sh 'GIT_TRACE=1 GIT_CURL_VERBOSE=1 git clone https://github.com/hnagnoud/bookwebapp.git . || true'
                    sh 'ls -la'
                    sh 'git status'
                }
            }
        }

        stage('Build Docker Image') {  
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Push Image to Registry') {  
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {  
            steps {
                script {
                    sh "kubectl apply -f ${K8S_DEPLOYMENT} -n ${NAMESPACE}"
                }
            }
        }
    }
}
