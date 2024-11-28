pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20.16.0'
        AWS_CREDENTIALS = credentials('aws-credentials')
        DISCORD_WEBHOOK = credentials('discord-webhook')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm ci'
                bat 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                    bat 'npm run deploy'
                }
            }
        }
    }
    
    post {
        always {
            discordSend(
                description: "Jenkins Build ${currentBuild.currentResult}",
                link: env.BUILD_URL,
                result: currentBuild.currentResult,
                title: env.JOB_NAME,
                webhookURL: DISCORD_WEBHOOK
            )
        }
    }
}