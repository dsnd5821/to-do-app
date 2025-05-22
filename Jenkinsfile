pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "desmond0905/todo-app"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds"
        EC2_IP = "52.207.239.113"
    }
    stages {
    //     stage('Clean Workspace') {
    //         steps {
    //             cleanWs()
    //         }
    //     }

    //     stage('Checkout Code') {
    //         steps {
    //             git url: 'https://github.com/dsnd5821/to-do-app.git', branch: 'main'
    //         }
    //     }

    //     stage('Install Backend Dependencies') {
    //         steps {
    //             dir('server') {
    //                 bat 'npm install'
    //             }
    //         }
    //     }

    //     stage('Build React Frontend') {
    //         steps {
    //             dir('client') {
    //                 bat 'npm install'
    //                 bat 'npm run build'
    //             }
    //         }
    //     }
        
    //     stage('Start MongoDB') {
    //         steps {
    //             bat 'docker compose -f docker-compose.test.yml up -d'
    //             bat 'ping -n 11 127.0.0.1 > nul'
    //         }
    //     }

    //     stage('Run Unit Tests') {
    //         steps {
    //             dir('server') {
    //                 bat 'npm test || echo "No server tests"'
    //             }
    //         }
    //     }
        
    //     stage('Stop MongoDB') {
    //         steps {
    //             bat 'docker compose -f docker-compose.test.yml down --remove-orphans'
    //         }
    //     }

    //     stage('Docker Build') {
    //         steps {
    //             script {
    //                 docker.build(env.DOCKER_IMAGE)
    //             }
    //         }
    //     }
    //     stage('Push to Docker Hub') {
    //         steps {
    //             withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
    //                 script {
    //                     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
    //                         docker.image("desmond0905/todo-app").push('latest')
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     stage('Compose Up') {
    //         steps {
    //             bat 'docker compose -f docker-compose.yml up -d'
    //         }
    //     }
    //
        stage('Deploy to EC2') {
          steps {
            withCredentials([sshUserPrivateKey(
              credentialsId: 'todoapp.pem',
              keyFileVariable: 'SSH_KEY',
              usernameVariable: 'SSH_USER'
            )]) {
              bat '''
                ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SSH_USER@${EC2_IP} "
                  docker pull myrepo/todo-app:latest &&
                  docker stop todo-app || true &&
                  docker rm todo-app || true &&
                  docker run -d --name todo-app -p 80:3000 myrepo/todo-app:latest
                "
              '''
            }
          }
        }

    }

    post {
        always {
            echo "Pipeline completed with status: ${currentBuild.currentResult}"
        }
    }
}
