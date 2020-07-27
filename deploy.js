const showBanner = require('node-banner')
const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()

const printBanner = async (title, color) => {
  await showBanner(title, '', color)
}

printBanner('Deploying', 'yellow')

const EnvDomain = {
  test: { host: 'jjt2.top', user: 'yangsh', password: '2^Jw$#2Qb5' },
  production: { host: '182.61.4.137', user: 'yangsh', password: 'b%RU470!' },
}

const env = EnvDomain[process.env.NODE_ENV]
const { user, host, password, short } = env
printBanner(`Deploying ${short}`, 'yellow')

const config = {
  user,
  password,
  host,
  port: 21,
  localRoot: __dirname + '/build',
  remoteRoot: '/platform',
  include: ['*', '**/*'],
  deleteRemote: true,
  forcePasv: true,
}

ftpDeploy
  .deploy(config)
  .then(() => printBanner(`Deploy ${short} Success`, 'green'))
  .catch((err) => {
    console.log(err)
    printBanner(`Deploy ${short} failed`, 'red')
  })
