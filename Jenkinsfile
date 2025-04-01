pipeline {
    agent any  // Chạy trên bất kỳ agent nào

    environment {
        DOCKER_IMAGE = "hnagnoud/node-app"
        K8S_DEPLOYMENT = "k8s/deploy_svc.yaml"
        NAMESPACE = "test"
    }        

    stages {
        stage('Setup Git Safe Directory') {
            steps {
                sh 'git config --global --add safe.directory /var/jenkins_home/workspace/test'
            }
        }
        stage('Checkout Code') {  // Lấy code từ GitHub
            steps {
                git branch: 'master', url: 'https://github.com/hnagnoud/bookwebapp.git'
            }
        }

        stage('Build Docker Image') {  // Tạo Docker image
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Push Image to Registry') {  // Đẩy image lên Docker Hub
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {  // Deploy lên Kubernetes
            steps {
                script {
                    sh "kubectl apply -f ${K8S_DEPLOYMENT} -n ${NAMESPACE}"
                }
            }
        }
    }
}
