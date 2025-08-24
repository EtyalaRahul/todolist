pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            when {
                expression { fileExists('frontend-todolist/package.json') }
            }
            steps {
                dir('frontend-todolist') {
                    bat 'npm install'
                    bat 'npm run build'
                }
                stash name: 'frontend', includes: 'frontend-todolist/dist/**'
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('todolist') {
                    bat 'mvn clean package'
                }
                stash name: 'backend', includes: 'todolist/target/*.war'
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                unstash 'frontend'
                bat '''
                echo Deploying Frontend to Tomcat...
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
                unstash 'backend'
                bat '''
                echo Deploying Backend to Tomcat...
                set TOMCAT_PATH=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps
                if exist "%TOMCAT_PATH%\\todolist.war" (
                    del /Q "%TOMCAT_PATH%\\todolist.war"
                )
                if exist "%TOMCAT_PATH%\\todolist" (
                    rmdir /S /Q "%TOMCAT_PATH%\\todolist"
                )
                copy todolist\\target\\*.war "%TOMCAT_PATH%"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
            echo '🌐 Access Frontend: http://localhost:2030/todolist-ui'
            echo '🌐 Access Backend: http://localhost:2030/todolist'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs for details.'
        }
    }
}
