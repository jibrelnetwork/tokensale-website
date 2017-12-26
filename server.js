const path = require('path')
const vhost = require('vhost')
const proxy = require('express-http-proxy')
const logger = require('morgan')
const express = require('express')
const interceptor = require('express-interceptor')
// const { redirectToHTTPS } = require('express-http-to-https')

// Main app
const main = express()
main.use(logger('dev'))
// main.use(redirectToHTTPS([/localhost:(\d{4})/]))

const replaceGoogleDomainsToProxy = (text) => text
  .replace(/https:\/\/www\.google\.com/g, 'http://google.example.com:8080')
  .replace(/https:\/\/www\.gstatic\.com/g, 'http://gstatic.example.com:8080')

const manageProxiedRequest = (_, proxyResData) =>
  replaceGoogleDomainsToProxy(proxyResData.toString('utf8'))

const proxySettings = {
  https: true,
  userResDecorator: manageProxiedRequest,
}

main.use('/google', proxy('http://www.google.com', proxySettings))
main.use('/gstatic', proxy('http://www.gstatic.com', proxySettings))
main.use(
  interceptor((req) => ({
    isInterceptable: () => /\.js/.test(req.url),
    intercept: (body, send) => { send(replaceGoogleDomainsToProxy(body)) },
  }))
)
main.use(express.static(path.join(__dirname, '/build')))

// Redirect app
const redirect = express()

redirect.use((req, res) => {
  res.redirect(`example.com:8080/${req.vhost[0]}`)
})

const host = express()
host.use(vhost('example.com', main))
host.use(vhost('*.example.com', redirect))

host.listen(process.env.PORT || 8080)
