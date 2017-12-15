const express = require('express')
const path = require('path')
const { redirectToHTTPS } = require('express-http-to-https')

const app = express()

app.use(redirectToHTTPS([/localhost:(\d{4})/]))
app.use(express.static(path.join(__dirname, '/build')))
app.listen(process.env.PORT || 8080)
