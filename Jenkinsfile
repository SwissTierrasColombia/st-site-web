properties([pipelineTriggers([githubPush()])])
node {
    stage('Checkout SCM') {
        steps {
            checkout([
      $class: 'GitSCM',
      branches: [[name: 'develop']],
      userRemoteConfigs: [[
        url: 'https://github.com/SwissTierrasColombia/st-site-web.git',
        credentialsId: '',
      ]]
     ])
        }
    }
    stage('preparation') {
        echo 'Poc'
    }
}
