properties([pipelineTriggers([githubPush()])])
node {
    stage('preparation') {
        echo sh(script: 'env|sort', returnStdout: true)
        git(
            url: 'https://github.com/SwissTierrasColombia/st-site-web.git',
            branch: "${env.BRANCH_NAME}"
            )
        echo 'Poc'
    }
    stage('Build') {
        steps {
            script {
                if (env.BRANCH_NAME == 'master') {
                    echo 'this is branch master'
            } else if (env.BRANCH_NAME == 'develop') {
                    echo 'this is branch develop'
                }
            }
        }
    }
}
