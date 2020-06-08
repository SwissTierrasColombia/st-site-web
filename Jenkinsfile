properties([pipelineTriggers([githubPush()])])
node {
    stage('preparation') {
        git(
            url: 'https://github.com/SwissTierrasColombia/st-site-web.git',
            credentialsId: '',
            branch: 'develop'
            )
        echo 'Poc'
    }
}
