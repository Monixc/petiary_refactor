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
        success {
            discordSend description: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        title: "Jenkins 빌드 알림",
                        webhookURL: env.DISCORD_WEBHOOK
        }
        failure {
            discordSend description: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        title: "Jenkins 빌드 알림",
                        webhookURL: env.DISCORD_WEBHOOK
        }
    }
}