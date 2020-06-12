properties([pipelineTriggers([githubPush()])])
node {
    stage('preparation') {
        echo sh(script: 'env|sort', returnStdout: true)
        git(
            url: 'https://github.com/SwissTierrasColombia/st-site-web.git',
            branch: "${env.BRANCH_NAME}"
            )
        correos = 'amacostapulido@gmail.com,carrillo.german@gmail.com,sergio.ramirez@incige.com,jhonfr29@gmail.com,felipecanol@gmail.com,galvarezhn@gmail.com,jonyfido@gmail.com,Daniel.Casalprim@bsf-swissphoto.com,andresguarinlo@gmail.com'
    }
    stage('Build') {
        sh '''
        cat << EOF > src/environments/environment.prod.ts
        const apiBaseUrl = 'https://apist.proadmintierra.info';
        export const environment = {
            production: true,
            apiBaseUrl,
            apiBaseUrlPrefix: apiBaseUrl + '/api',
            nameTokenSession: 'access_token_st',
            clientUsername: '${env.clientUsernameMasterST}',
            clientPassword: '${env.clientPasswordMasterST}'
            };
        EOF
        '''
        sh '''
    cat << EOF > src/environments/environment.ts
    const apiBaseUrl = 'http://192.168.1.102:8090';
    export const environment = {
      production: false,
      apiBaseUrl,
      apiBaseUrlPrefix: apiBaseUrl + '/api',
      nameTokenSession: 'access_token_st',
      clientUsername: '${env.clientUsernameDevelopST}',
      clientPassword: '${env.clientPasswordDevelopST}'
    };
    EOF
           '''
        env.GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        env.GIT_BRANCH = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
        sh "echo current commit ${env.GIT_COMMIT}"
        sh "echo current branch ${env.GIT_BRANCH}"
        emailext (
            subject: "START: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
            body: """<p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
            to: "${correos}"
            )
        nodejs(nodeJSInstallationName: 'node-10.19.0', configId: null) {
            sh '''
                npm install
                npm run-script build
                tar czf dist.tar.gz dist
                '''
        }
    }
    stage ('Deploy-master') {
        when { branch 'master' }
        sh 'ssh stf@192.168.98.203 rm -rf /var/www/st/html/dist'
        sh "scp dist.tar.gz stf@192.168.98.203:/var/www/st/html/dist-${env.GIT_BRANCH}-${env.GIT_COMMIT}.tar.gz"
        sh "ssh stf@192.168.98.203 tar --overwrite -xf /var/www/st/html/dist-master-${env.GIT_COMMIT}.tar.gz -C /var/www/st/html/"
    }
    stage('Results') {
        emailext (
              subject: "FINISHED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
              body: """<p>FINISHED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
              <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>
              Espero que todo salga bien :P http://st-agencia.proadmintierra.info/""",
              to: "${correos}"
      )
    }
}
