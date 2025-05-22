pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "desmond0905/todo-app"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds"
        EC2_IP = "44.202.7.190"
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
        stage('Deploy to EC2 Test Server') {
          steps {
            withCredentials([sshUserPrivateKey(
              credentialsId: 'todoapp.pem',
              keyFileVariable: 'SSH_KEY',
              usernameVariable: 'SSH_USER'
            )]) {
              powershell '''
                $key = "$env:SSH_KEY"
        
                # Remove inheritance and group permissions
                icacls $key /inheritance:r | Out-Null
                icacls $key /remove "BUILTIN\\Users" "Everyone" | Out-Null
        
                # Grant read permission to current Jenkins user
                $user = whoami
                icacls $key /grant "$user:R" | Out-Null
        
                # Confirm new permissions
                icacls $key
        
                # Run SSH
                ssh -v -o StrictHostKeyChecking=no -i "$key" $env:SSH_USER@${EC2_IP} `
                  "docker pull desmond0905/todo-app:latest && `
                   docker stop todo-app || true && `
                   docker rm todo-app || true && `
                   docker run -d --name todo-app -p 80:3000 desmond0905/todo-app:latest && `
                   docker ps"
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
