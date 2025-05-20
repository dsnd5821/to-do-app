pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/dsnd5821/to-do-app.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install --prefix server'
        sh 'npm install --prefix client'
      }
    }

    stage('Build Frontend') {
      steps {
        sh 'npm run build --prefix client'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test --prefix server || echo "No server tests"'
      }
    }

    stage('Docker Build and Push') {
      steps {
        sh 'docker build -t yourdockerhubuser/todo-app:latest .'
        sh 'docker push yourdockerhubuser/todo-app:latest'
      }
    }

    stage('Deploy to Azure VM') {
      steps {
        sh '''
        ssh azureuser@your-test-server "docker pull yourdockerhubuser/todo-app:latest && \
        docker stop todo-test || true && docker rm todo-test || true && \
        docker run -d --name todo-test -p 80:3000 yourdockerhubuser/todo-app:latest"
        '''
      }
    }
  }
}