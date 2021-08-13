pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh '''#!/bin/bash
REGISTRY=$REGISTRY_ENDPOINT
REPOSITORY=$REPOSITORY
DOCKERFILE_PATH=$DOCKERFILE_PATH

docker build -t ${REGISTRY}/${REPOSITORY}:latest -f ${DOCKERFILE_PATH} .

echo -e "\\nBuild Completed"'''
      }
    }
    stage('Docker Push') {
      steps {
        sh '''#!/bin/bash
REGISTRY=$REGISTRY_ENDPOINT
REPOSITORY=$REPOSITORY
REGISTRY_USER=$REGISTRY_USER
REGISTRY_PASSWORD=$REGISTRY_PASSWORD
BUILDTAG=$BUILD_NUMBER

REGISTRY_CRED="${REGISTRY_USER}:${REGISTRY_PASSWORD}"
REPO_LABEL=${REGISTRY}/${REPOSITORY}

docker tag ${REPO_LABEL}:latest ${REPO_LABEL}:${BUILDTAG}

docker push ${REPO_LABEL}:${BUILDTAG}
docker push ${REPO_LABEL}:latest

echo -e "\\nPushed ${REPO_LABEL}:${BUILDTAG}"'''
      }
    }
    stage('Update Release') {
      steps {
        dir ('release-tmp') {
          git branch: 'master', credentialsId: 'Github', url: 'https://github.com/voidwell/server.git'
          sh '''#!/bin/bash
BUILDTAG=$BUILD_NUMBER
ENV_VAR_KEY="IMAGE_${SERVICE_NAME^^}_VERS"

sed -i "/^${ENV_VAR_KEY}=/{h;s/=.*/=${BUILDTAG}/};\\${x;/^$/{s//${ENV_VAR_KEY}=${BUILDTAG}/;H};x}" $RELEASE_FILE

git add $RELEASE_FILE
git commit -m "Updated ${ENV_VAR_KEY} with ${BUILDTAG}"
'''
          sshagent(credentials: ['GithubSSH']) {
            sh 'git remote set-url origin git@github.com:voidwell/server.git'
            sh 'git push origin master'
          }
        }
      }
    }
  }
  environment {
    REGISTRY_USER = credentials('docker-registry-user')
    REGISTRY_PASSWORD = credentials('docker-registry-password')
    REGISTRY_ENDPOINT = 'docker.voidwell.com'
    REPOSITORY = 'voidwell/clientui'
    SERVICE_NAME = 'clientui'
    DOCKERFILE_PATH = './Dockerfile'
    RELEASE_FILE = '.env.prod'
  }
}
