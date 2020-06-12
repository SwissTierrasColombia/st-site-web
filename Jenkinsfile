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
}
