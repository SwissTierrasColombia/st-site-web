properties([pipelineTriggers([githubPush()])])
 
pipeline {
    /* specify nodes for executing */
    agent {
        label 'github-ci'
    }
 
    stages {
        /* checkout repo */
        stage('Checkout SCM') {
            steps {
                checkout([
                 $class: 'GitSCM',
                 branches: [[name: 'develop']],
                 userRemoteConfigs: [[
                    url: 'https://github.com/SwissTierrasColombia/st-site-web',
                    credentialsId: '',
                 ]]
                ])
            }
        }
         stage('Do the deployment') {
            steps {
                echo ">> Run deploy applications "
            }
        }
    }
 
    /* Cleanup workspace */
    post {
       always {
           deleteDir()
       }
   }
}