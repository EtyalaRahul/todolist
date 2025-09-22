pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                dir("frontend-todolist\\todolist") {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-frontend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-frontend"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-frontend"
                xcopy /E /I /Y "${WORKSPACE}\\frontend-todolist\\todolist\\dist\\*" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-frontend\\"
                """
            }
        }

        stage('Build Backend') {
            steps {
                dir("todolist") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-backend.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-backend.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-backend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-backend"
                )
                copy "${WORKSPACE}\\todolist\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist-backend.war"
                """
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed. Please check logs.'
        }
    }
}
