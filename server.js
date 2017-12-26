const path = require('path')
const proxy = require('express-http-proxy')
const express = require('express')
const interceptor = require('express-interceptor')
const { redirectToHTTPS } = require('express-http-to-https')

const app = express()

const replaceGoogleDomainsToProxy = (text) => text
  .replace(/\^https:\\\/\\\/www\.gstatic\.c\.\.\?/, '\\/gstatic-proxy')
  .replace(/https:\/\/www\.google\.com/g, '/google-proxy')
  .replace(/https:\/\/www\.gstatic\.com/g, '/gstatic-proxy')
  .replace(/https:\/\/apis\.google\.com/g, '/gapi-proxy')

const manageProxiedRequest = (_, proxyResData) =>
  replaceGoogleDomainsToProxy(proxyResData.toString('utf8'))

const proxySettings = {
  https: true,
  userResDecorator: manageProxiedRequest,
}

app.use(redirectToHTTPS([/localhost:(\d{4})/]))
app.use('/gapi-proxy', proxy('https://apis.google.com', proxySettings))
app.use('/google-proxy', proxy('https://www.google.com', proxySettings))
app.use('/gstatic-proxy', proxy('https://www.gstatic.com', proxySettings))

app.use(
  interceptor((req) => ({
    isInterceptable: () => /\.js/.test(req.url),
    intercept: (body, send) => { send(replaceGoogleDomainsToProxy(body)) },
  }))
)
app.use(express.static(path.join(__dirname, '/build')))
app.listen(process.env.PORT || 8080)
