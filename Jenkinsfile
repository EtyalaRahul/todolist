pipeline {
    agent any

    stages {

        // ===== DOWNLOAD ARTIFACTS =====
        stage('Fetch Artifacts') {
            steps {
                echo "📥 Downloading latest build artifacts..."
                // Jenkins automatically uses last successful build artifacts
                copyArtifacts(projectName: 'todolist-build', filter: '**', fingerprintArtifacts: true)
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                echo 🚀 Deploying Frontend to Tomcat...
                set FRONTEND_PATH=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-ui
                if exist "%FRONTEND_PATH%" (
                    rmdir /S /Q "%FRONTEND_PATH%"
                )
                mkdir "%FRONTEND_PATH%"
                xcopy /E /I /Y frontend-todolist\\dist\\* "%FRONTEND_PATH%"
                '''
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                echo 🚀 Deploying Backend to Tomcat...
                set TOMCAT_PATH=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps
                if exist "%TOMCAT_PATH%\\todolist.war" (
                    del /Q "%TOMCAT_PATH%\\todolist.war"
                )
                if exist "%TOMCAT_PATH%\\todolist" (
                    rmdir /S /Q "%TOMCAT_PATH%\\todolist"
                )
                copy "todolist\\target\\*.war" "%TOMCAT_PATH%"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
            echo '🌐 Access Frontend at: http://localhost:8080/todolist-ui'
            echo '🌐 Access Backend APIs at: http://localhost:8080/todolist'
        }
        failure {
            echo '❌ Deployment Failed. Check logs for details.'
        }
    }
}
