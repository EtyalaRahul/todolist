pipeline {
    agent any

    environment {
        // Tomcat path configuration
        TOMCAT_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"
        FRONTEND_FOLDER = "frontend-todolist\\todolist"
        BACKEND_FOLDER = "todolist"
    }

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_FOLDER}") {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                if exist "${TOMCAT_PATH}\\todolist-frontend" (
                    rmdir /S /Q "${TOMCAT_PATH}\\todolist-frontend"
                )
                mkdir "${TOMCAT_PATH}\\todolist-frontend"
                xcopy /E /I /Y "${WORKSPACE}\\${FRONTEND_FOLDER}\\dist\\*" "${TOMCAT_PATH}\\todolist-frontend\\"
                """
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir("${BACKEND_FOLDER}") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                if exist "${TOMCAT_PATH}\\todolist-backend.war" (
                    del /Q "${TOMCAT_PATH}\\todolist-backend.war"
                )
                if exist "${TOMCAT_PATH}\\todolist-backend" (
                    rmdir /S /Q "${TOMCAT_PATH}\\todolist-backend"
                )
                copy "${WORKSPACE}\\${BACKEND_FOLDER}\\target\\*.war" "${TOMCAT_PATH}\\todolist-backend.war"
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed. Please check logs.'
        }
    }
}
