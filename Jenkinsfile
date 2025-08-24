pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            when {
                expression { fileExists('frontend-todolist/package.json') }
            }
            steps {
                script {
                    echo "Building Frontend..."
                }
                dir('frontend-todolist') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            when {
                expression { fileExists('frontend-todolist/dist') }
            }
            steps {
                bat '''
                echo Deploying Frontend to Tomcat...
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist"
                xcopy /E /I /Y frontend-todolist\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('todolist') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                echo Deploying Backend to Tomcat...
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\todolist"
                )
                copy "todolist\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs for details.'
        }
    }
}
