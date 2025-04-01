pipeline {
    agent any

    stages {
        stage('Check Git Changes') {
            steps {
                script {
                    def GIT_COMMIT_BEFORE = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    sh 'git pull origin master'  // Cập nhật code mới nhất
                    def GIT_COMMIT_AFTER = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()

                    if (GIT_COMMIT_BEFORE == GIT_COMMIT_AFTER) {
                        echo "🚀 Không có thay đổi trong repo Git."
                    } else {
                        echo "✅ Có thay đổi trong Git repo! Jenkins sẽ trigger build."
                    }
                }
            }
        }
    }
}
